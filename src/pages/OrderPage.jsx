import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ORDER_MODE_FROM_CART, ORDER_MODE_FROM_SINGLE } from "../utils/Constant";
import { notify } from "../utils/notify";
import useGetCoupons from "../hooks/coupon/useGetCoupons";
import Loading from "../utils/Loading";
import Error from "../utils/Error";
import VoucherDialog from "../components/OrderPage/VoucherDialog";
import useUserInfor from "../hooks/user/useUserInfor";


function formatCurrency(value) {
    if (value == null) return "";
    return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
}

import ListAddressDialog from "@/components/OrderPage/ListAddressDialog";
export default function OrderPage() {
    const { state } = useLocation();
    const [orderParamsBuyFromCart, setOrderParamsBuyFromCart] = useState({});
    const [orderParamsBuyNow, setOrderParamsBuyNow] = useState({});

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
                    items: state?.cartItems ?? [],
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
    const [selectVoucherDialog, setSelectVoucherDialog] = useState(false);

    // load danh sach ma giam gia
    useEffect(() => {
        if (vouchers) {
            setVoucherList(vouchers);
        }
    }, [vouchers]);

    // Các phần liên quan đến địa chỉ 
    const { data: user, isError: errorUser, isLoading: loadingUser } = useUserInfor();
    // const [address, setAddress] = useState(null);
    const [showAddressDialog, setShowAddressDialog] = useState(false);
    const [selectAddress, setSelectAddress] = useState(null);
    const [addressList, setAddressList] = useState(user?.userProfile?.addressResponse);


    const address = [
        {
            addressId: 1,
            fullName: "Nguyễn Văn A",
            phone: "0901234567",
            shortAddress: "123 Đường Láng, ngõ 12, Quận Đống Đa, Hà Nội",
            label: "Nhà riêng Hà Nội",
            isDefault: true,
        },
        {
            addressId: 2,
            fullName: "Nguyễn Văn A",
            phone: "0901234567",
            shortAddress: "123 Đường Láng, ngõ 12, Quận Đống Đa, Hà Nội",
            label: "Nhà riêng Hà Nội",
            isDefault: true,
        },

    ];

    // Check lỗi
    if (vouchersLoading) return <Loading />;
    if (vouchersError) {
        console.log(vouchersError);
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

                <section className=" flex-7 h-[800px] overflow-y-auto rounded-sm p-5  ">
                    <div className="w-full flex flex-col items-center mt-6 mb-10">
                        <h2 className="text-3xl font-bold text-blue-900 uppercase">
                            DANH SÁCH SẢN PHẨM
                        </h2>
                        <div className="flex items-center mt-2">
                            <span className="flex-grow h-px bg-blue-300"></span>
                            <span className="mx-3 text-blue-500">● ● ●</span>
                            <span className="flex-grow h-px bg-blue-300"></span>
                        </div>
                    </div>
                    {/* row Buy Now*/}
                    {orderParamsBuyNow !== null && (
                        <div
                            className="p-5 m-4 flex flex-row gap-6 bg-white rounded-xl shadow-lg 
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

                </section>

                {/* phần bên phải - KHÔNG SCROLL */}
                <section className="flex-4 rounded-md flex flex-col gap-6 p-6 bg-white shadow-md">
                    {/* Ghi chú */}
                    <div className=" p-5 space-y-3">
                        <label className="block text-gray-700 font-semibold text-sm">
                            Ghi chú mua hàng:
                        </label>
                        <input
                            type="text"
                            placeholder="Nhập ghi chú sản phẩm nếu có nhắc nhở..."
                            className="w-full px-4 py-2 border-gray-50 rounded-md 
                            shadow-sm transition duration-200"
                        />
                    </div>

                    {/* Mã giảm giá */}
                    <div className="p-5">
                        {onShowVoucherDialog &&
                            <VoucherDialog
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
                                value={selectVoucherDialog?.code ?? ""}
                                readOnly
                                placeholder="Chọn mã giảm giá..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg bg-white focus:outline-none"
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
                            {/* <p className="font-medium">{addressList[0].fullAddress}</p> */}
                            {/* <p>{address[0].shortAddress}</p>
                            {address[0].additionalInfo && (
                                <p className="text-gray-500 italic">{address[0].additionalInfo}</p>
                            )} */}
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
                                open={showAddressDialog}
                                onClose={() => (setShowAddressDialog(false))}
                                onSelect={(address) => {
                                    setSelectAddress(address);
                                    setShowAddressDialog(false)
                                }}
                            />
                        }
                    </div>

                    {/* Thanh toán */}
                    <div className=" p-5 space-y-2">
                        <div className="flex justify-between text-gray-700">
                            <span>Tổng số tiền hàng</span>
                            <span className="font-medium">500.000đ</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Phí vận chuyển</span>
                            <span className="font-medium">30.000đ</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Voucher giảm giá</span>
                            <span className="font-medium text-green-600">-50.000đ</span>
                        </div>
                        <div className="flex justify-between text-gray-900 font-bold border-t pt-2">
                            <span>Tổng thanh toán</span>
                            <span>480.000đ</span>
                        </div>
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