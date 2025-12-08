import React, { useState } from 'react';
import { formatCurrency } from '@/components/product-details/sample/FomartProduct';
import useProducts from '@/hooks/product/useProducts';
import ProductList from '@/components/product-list/ProductList';
import useFindCartByProfileId from '../hooks/cart/useFindCartByProfileId';
import Loading from '@/utils/Loading';
import Error from '@/utils/Error';
import useUserInfor from "@/hooks/user/useUserInfor";
import { useNavigate } from 'react-router-dom';
import { notify } from '../utils/notify';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useRemoveItemFromCart from '../hooks/cart-item/useRemoveCartItemFromCart';
import ConfirmDialog from "@/utils/ConfirmDialog.jsx";

export default function CartPage() {
  // navigate
  const navigate = useNavigate();

  const { data: user } = useUserInfor();
  const profileId = user?.userProfile?.profileId;
  // Product pagination  
  const [page, setPage] = useState(0);
  const { data, isError: errorListProduct, isLoading: loadingListProduct } = useProducts(page, 5, 'productId', 'asc');
  const productList = data?.data?.data?.content || [];
  const totalPages = data?.data.data.totalPages || 1;

  //  Cart
  const { data: cart, isError: cartError, isLoading: cartLoading } = useFindCartByProfileId(profileId);

  const [selectItems, setSelectItems] = useState([]);
  console.log("Selected items:", selectItems);

  // check input box
  const toggleCheck = (itemId) => {
    setSelectItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleCheckAll = () => {
    const allChecked = cart.items.every((item) => selectItems.includes(item.id))
    if (allChecked) setSelectItems([]);
    else cart.items && setSelectItems(cart.items.map((item) => item.id));
  };

  const handleIncrease = (id) => {
    setSelectItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const handleDecrease = (id) => {
    setSelectItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };


  // Click mua hàng
  const handleClickBuy = () => {
    navigate('/order', {
      state: {
        mode: "cart",
        product: 20,
        addressId: 10,
        profileId: 1
      }
    });
  }


  // Xóa sản phẩm khỏi giỏ hàng 
  const { mutate: removeItem, isError: removeItemError, isLoading: removeItemLoading } = useRemoveItemFromCart();
  // const [showDialog, setShowDialog] = useState(false);

  const hanldeClickRemoveItem = (itemId) => {
    const cartId = cart?.cartId;
    const cartItemId = itemId;

    if (!cartId || !cartItemId) {
      notify.error("Xóa khỏi cart không thành công");
      return;
    }

    removeItem({ cartId, cartItemId });

  }

  if (cartLoading || loadingListProduct || removeItemLoading) {
    return <Loading />;
  }

  if (cartError || errorListProduct || removeItemError) {
    console.log("Error when fetch cart data", cartError);
    return <Error />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <h1 className="mb-4 text-2xl font-bold">🛒 Giỏ hàng</h1>

      {/* Header */}
      <div className="grid grid-cols-12 p-5 mb-3 text-gray-600 font-semibold bg-white rounded-md shadow-md items-center">
        <div className="flex col-span-5 items-center">
          <input
            type="checkbox"
            checked={selectItems.length === cart.items.length}
            onChange={toggleCheckAll}
            className="mr-3 size-4"
          />
          <span>Sản phẩm</span>
        </div>
        <div className="text-center col-span-2">Đơn giá</div>
        <div className="text-center col-span-2">Số lượng</div>
        <div className="text-center col-span-2">Số tiền</div>
        <div className="text-center col-span-1">Thao tác</div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-12 gap-4 p-5 bg-white rounded-md shadow-sm items-center"
          >
            {/* Cột sản phẩm */}
            <div className="flex items-center sm:col-span-3 md:col-span-5">
              <input
                type="checkbox"
                checked={selectItems.includes(item.id)}
                onChange={() => toggleCheck(item.id)}
                className="mr-3 size-4"
              />
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              <div className="w-[60%]">
                <p className="font-semibold break-words">{item.name}</p>
              </div>
            </div>

            {/* Đơn giá */}
            <div className="text-center text-red-500 font-bold sm:col-span-1 md:col-span-2">
              {formatCurrency(item.price)}
            </div>

            {/* Số lượng */}
            <div className="flex items-center justify-center gap-2 sm:col-span-1 md:col-span-2 ">
              <button
                onClick={() => handleDecrease(item.id)}
                className="h-8 w-8 bg-gray-100 border rounded-full hover:bg-gray-200"
              >
                -
              </button>
              <input
                readOnly
                value={item.quantity}
                className="w-12 text-center border rounded-md"
              />
              <button
                onClick={() => handleIncrease(item.id)}
                className="h-8 w-8 bg-gray-100 border rounded-full hover:bg-gray-200"
              >
                +
              </button>
            </div>

            {/* Số tiền */}
            <div className="text-center font-semibold text-gray-700 sm:col-span-1 md:col-span-2">
              {formatCurrency(item.price * item.quantity)}
            </div>

            {/* Thao tác xóa item khỏi giỏ */}
            <div className="text-center sm:col-span-1 md:col-span-1">
              <button
                onClick={() => hanldeClickRemoveItem(item.id)}
                className="text-red-500 hover:underline"
              >
                <FontAwesomeIcon icon={faTrash} size="lg" />
              </button>
            </div>

            {/* xác nhận xóa item */}
            {/* <ConfirmDialog
              isOpen={showDialog}
              onClose={() => setShowDialog(false)}
              onConfirm={() => handleConfirmRemoveItem}
              title="Xác nhận xóa"
              message="Bạn có muốn xóa không ? "
              confirmText="Xóa"
              cancelText="Hủy"
            /> */}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 mt-6 bg-white rounded-md shadow-md">
        <p className="text-lg font-bold">
          Tổng cộng:{' '}
          <span className="text-red-600">
            {formatCurrency(cart.totalPrice ? cart.totalPrice : 0)}
          </span>
        </p>
        <button
          onClick={handleClickBuy}
          className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
          Mua hàng
        </button>
      </div>

      {/* Sản phẩm liên quan */}
      <div className="mt-10 border-t-2 border-gray-200">
        <ProductList products={productList} totalPages={totalPages} page={page} setPage={setPage} />
      </div>
    </div>
  );
}
