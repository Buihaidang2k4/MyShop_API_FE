import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ORDER_MODE_FROM_CART, ORDER_MODE_FROM_SINGLE } from "../utils/Constant";
import useGetCoupons from "../hooks/coupon/useGetCoupons";
import Loading from "../utils/Loading";
import Error from "../utils/Error";
import VoucherDialog from "../components/OrderPage/VoucherDialog";
import useUserInfor from "../hooks/user/useUserInfor";
import { formatCurrency } from "../components/product-details/sample/FomartProduct";
import GetAddressDefault from "../components/OrderPage/GetAddressDefault";
import ListAddressDialog from "@/components/OrderPage/ListAddressDialog";
import useGetAddressByProfileId from "../hooks/address/useGetAddressByProfileId";
import PaymentMethod, { PAYMENT_METHODS } from "../components/OrderPage/PaymentMethod";
import useGetItemByIds from "../hooks/cart-item/useGetItemByIds";
import OrderItemList from "../components/OrderPage/OrderItemList";
import { calculateOrderPrice } from "../components/OrderPage/logic/orderPricingFromCart";
import OrderSummary from "../components/OrderPage/OrderSummary";
import { calculateOrderPriceBuyNow } from "../components/OrderPage/logic/orderPricingFromBuyNow";

export default function OrderPage() {
    const { state } = useLocation();
    const [orderParamsBuyFromCart, setOrderParamsBuyFromCart] = useState({});
    const [orderParamsBuyNow, setOrderParamsBuyNow] = useState({});
    const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS.CASH.value);
    
    // gán dữ liệu theo từng trường hợp mua từ giỏ hàng hay trực tiếp từ sản phẩm 
    useEffect(() => {
        switch (state?.mode) {
            case ORDER_MODE_FROM_SINGLE: {
                const buyNowData = {
                    product: state?.product,
                    productName: state?.product?.productName ?? "Không có tên",
                    description: state?.product?.description ?? "Không có mô tả",
                    category: state?.product?.category?.categoryName ?? "Không có danh mục",
                    price: state?.product?.specialPrice ?? state?.product?.price ?? 0,
                    quantity: state?.quantity ?? 1,
                    image: state?.images[0] ?? "",
                };
                setOrderParamsBuyNow(buyNowData);
                break;
            }

            case ORDER_MODE_FROM_CART: {
                const cartData = {
                    profileId: state?.profileId ?? "N/A",
                    items: state?.itemIds ?? [],
                };
                setOrderParamsBuyFromCart(cartData);
                break;
            }

            default:
                console.log("Invalid order mode.");
        }
    }, [state]);

    // voucher
    const { data: vouchers, isError: vouchersError, isLoading: vouchersLoading } = useGetCoupons();
    const [voucherList, setVoucherList] = useState(null);
    const [onShowVoucherDialog, setShowVoucherDialog] = useState(false)
    const [selectVoucherDialog, setSelectVoucherDialog] = useState(null);
    // Các phần liên quan đến địa chỉ 
    const { data: user, isError: errorUser, isLoading: loadingUser } = useUserInfor();
    const [showAddressDialog, setShowAddressDialog] = useState(false);
    const [selectAddress, setSelectAddress] = useState(null);
    const { data: addressData } = useGetAddressByProfileId(user?.userProfile?.profileId);
    const [addressList, setAddressList] = useState([]);
    const { data: cartItems, isError: errorItems, isLoading: loadingItems } =
        useGetItemByIds({
            profileId: orderParamsBuyFromCart.profileId,
            params: { ids: orderParamsBuyFromCart.items }
        });

    // load danh sach dia chi
    useEffect(() => {
        if (addressData) {
            setAddressList(addressData?.data?.data);
        }
    }, [addressData]);

    // load danh sach ma giam gia
    useEffect(() => {
        if (vouchers) {
            setVoucherList(vouchers);
        }
    }, [vouchers]);

    // load user
    useEffect(() => {
        if (user?.userProfile?.addressResponse) {
            setAddressList(user.userProfile.addressResponse);
        }
    }, [user]);

    // address
    const addressDefaultOrSelect = selectAddress ? selectAddress : GetAddressDefault(addressList);

    // tính toán giá giỏ hàng 
    const pricing = useMemo(() => {
        return calculateOrderPrice({
            items: cartItems?.data?.data || [],
            voucher: selectVoucherDialog,
            shippingFee: 30000,
        });
    }, [cartItems, selectVoucherDialog]);

    // tính toán giá mua ngay
    const pricingBuyNow = useMemo(() => {
        return calculateOrderPriceBuyNow({
            buyNowParams: orderParamsBuyNow,
            voucher: selectVoucherDialog,
            shippingFee: 30000,
        });
    }, [orderParamsBuyNow, selectVoucherDialog]);

    if (vouchersLoading || loadingUser || loadingItems) return <Loading />;
    if (vouchersError || errorUser || errorItems) {
        console.error(vouchersError);
        console.error(errorUser);
        console.error(errorItems);
        return <Error />
    }

    return (
        <>
            {/* header */}
            <div className="w-full flex flex-col items-center mt-6 mb-10">
                <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
                    THANH TOÁN SẢN PHẨM
                </h2>
                <div className="flex items-center mt-2 w-full max-w-md">
                    <span className="flex-grow h-px bg-gray-300"></span>
                    <span className="mx-3 text-pink-500">✿</span>
                    <span className="flex-grow h-px bg-gray-300"></span>
                </div>
            </div>

            {/* body */}
            <div className="flex flex-col md:flex-row sm:flex-col gap-5 m-5 ">

                <section className=" flex-7 h-[800px] overflow-y-auto  p-5  ">
                    {/* row Buy Now*/}
                    {state?.mode === ORDER_MODE_FROM_SINGLE && (
                        <div
                            className="p-5 flex flex-row gap-6 bg-white shadow-lg 
                            border border-gray-200 hover:shadow-2xl hover:scale-[1.02] 
                            transition-all duration-300 ease-in-out"
                        >
                            {/* Hình ảnh */}
                            <div className="flex-shrink-0">
                                <img
                                    className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                                    alt="Hình ảnh"
                                    src={state?.images?.[0]}
                                />
                            </div>

                            {/* Nội dung */}
                            <div className="flex flex-col justify-between flex-grow">
                                <span className="text-lg font-semibold text-gray-800">
                                    {orderParamsBuyNow.productName}
                                </span>
                                <span className="text-sm text-gray-600">
                                    <em className="text-gray-500">Mô tả: </em>
                                    {orderParamsBuyNow.description}
                                </span>

                                <div className="flex flex-row justify-between items-center mt-3">
                                    <span className="text-base font-medium text-green-600">
                                        {formatCurrency(orderParamsBuyNow.price)}
                                    </span>
                                    <span className="text-sm text-gray-700">
                                        SL: {orderParamsBuyNow.quantity}
                                    </span>
                                    <span className="text-base font-bold text-red-600">
                                        {formatCurrency(orderParamsBuyNow.price * orderParamsBuyNow.quantity)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* List Item khi mua từ giỏ hàng */}
                    {state?.mode === ORDER_MODE_FROM_CART && <OrderItemList items={cartItems?.data?.data || []} />}
                </section>

                {/* phần bên phải */}
                <section className="flex-4 rounded-md flex flex-col gap-6 p-6 bg-white shadow-md">
                    {/* Ghi chú */}
                    <div className=" p-5 space-y-3">
                        <label className="block text-gray-700 font-semibold text-sm">
                            Ghi chú mua hàng:
                        </label>
                        <input
                            type="text"
                            name="note"
                            placeholder="Nhập ghi chú sản phẩm nếu có nhắc nhở..."
                            className="w-full px-4 py-2 border-gray-50 rounded-md 
                            shadow-sm transition duration-200"
                        />
                    </div>

                    {/* Mã giảm giá */}
                    <div className=" p-5 space-y-3">
                        {onShowVoucherDialog &&
                            <VoucherDialog
                                totalAmountOrder={state?.mode === ORDER_MODE_FROM_CART ? pricing.subtotal : pricingBuyNow.subtotal}
                                vouchers={voucherList}
                                onClose={() => (setShowVoucherDialog(false))}
                                onSelect={(voucher) => {
                                    setSelectVoucherDialog(voucher);
                                    setShowVoucherDialog(false)
                                }} />
                        }
                        <div className="flex">
                            {/* Input */}
                            <input
                                type="text"
                                name="codeVoucher"
                                value={selectVoucherDialog?.code ?? ""}
                                readOnly
                                placeholder="Chọn mã giảm giá..."
                                className="flex-1 px-3 border border-gray-300 rounded-l-lg bg-white focus:outline-none"
                            />

                            {/* Button */}
                            <button
                                onClick={() => setShowVoucherDialog(true)}
                                className="px-4 py-2 border border-gray-300 rounded-r-lg bg-white text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            >
                                Mã giảm giá
                            </button>
                        </div>
                    </div>

                    {/* Địa chỉ */}
                    <div className="p-5 border rounded-lg bg-white  relative">
                        <label className="block text-gray-700 font-semibold text-sm mb-2">
                            Địa chỉ giao hàng <span className="border-2 text-[10px] border-amber-500 h-2 w-5 px-3 border-solid text-[red]">Mặc định </span>
                        </label>
                        <div className="space-y-1 text-sm text-gray-700">
                            {addressDefaultOrSelect && (
                                <>
                                    <p className="font-medium">{addressDefaultOrSelect.fullAddress}</p>
                                    <p>{addressDefaultOrSelect.shortAddress}</p>

                                    {addressDefaultOrSelect.additionalInfo && (
                                        <p className="text-gray-500 italic">
                                            {addressDefaultOrSelect.additionalInfo}
                                        </p>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Nút chọn địa chỉ khác */}
                        <div className="mt-4">
                            <button
                                onClick={() => setShowAddressDialog(true)}
                                className="  text-blue-500 hover:scale-105 text-sm font-medium cursor-pointer"
                            >
                                Chọn địa chỉ khác
                            </button>
                        </div>
                        {/* show list Address */}
                        {showAddressDialog &&
                            <ListAddressDialog
                                addresses={addressList}
                                selectedAddress={selectAddress}
                                open={showAddressDialog}
                                onClose={() => (setShowAddressDialog(false))}
                                onSelect={(address) => {
                                    setSelectAddress(address);
                                    setShowAddressDialog(false)
                                }}
                            />
                        }
                    </div>

                    {/* Phương thức thanh toán  */}
                    <PaymentMethod selectedMethod={selectedPayment} onMethodChange={setSelectedPayment} />


                    {/* Thanh toán */}
                    <div className=" p-5 space-y-2">
                        {state?.mode === ORDER_MODE_FROM_SINGLE && (
                            <OrderSummary
                                subtotal={pricingBuyNow.subtotal}
                                discount={pricingBuyNow.discount}
                                shippingFee={pricingBuyNow.shippingFee}
                                total={pricingBuyNow.total}
                            />
                        )
                        }


                        {state?.mode === ORDER_MODE_FROM_CART && (
                            <OrderSummary
                                subtotal={pricing.subtotal}
                                discount={pricing.discount}
                                shippingFee={pricing.shippingFee}
                                total={pricing.total}
                            />
                        )
                        }
                        <button
                            className="w-full mt-4 bg-red-500 text-white font-semibold py-3 rounded-md 
                            shadow hover:bg-red-600 transition duration-200"
                        >
                            Đặt hàng
                        </button>
                    </div>
                </section>
            </div>
        </>
    );
}