import useImageUrl from "@/hooks/image/useImageUrl";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/useAuthStore.jsx";
import { notify } from "@/utils/Notify.jsx";
import Button from "@mui/material/Button";
export default function ProductCard({ product }) {
  const {
    productName,
    description,
    price,
    discount,
    specialPrice,
    category,
    images,
  } = product;

  const imageUrl = useImageUrl(images);
  const navigate = useNavigate();

  // get auth state
  const { isLoggedIn } = useAuthStore();

  // check login 
  function handleClickBuy() {
    if (isLoggedIn) {
      navigate(`/product-details?productId=${product?.productId}`);
    } else {
      notify.error("Vui lòng đăng nhập để xem chi tiết sản phẩm!");
      return;
    }
  }

  function formatCurrency(value) {
    if (value == null) return "";
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  return (
    <div
      className="relative bg-white rounded-2xl shadow-lg border border-gray-100 
                 overflow-hidden hover:shadow-2xl transition duration-300 mx-2 group"
    >
      {/* Badge giảm giá */}
      {discount > 0 && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
          -{discount}%
        </span>
      )}

      {/* Ảnh sản phẩm */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={imageUrl || "/placeholder.png"}
          alt={productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Nội dung sản phẩm */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition truncate">
          {productName}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>

        {/* Giá */}
        <div className="flex items-center gap-2">
          <span className="text-red-600 font-bold">
            {formatCurrency(specialPrice ? specialPrice : price )}
          </span>
          {discount > 0 && (
            <span className="text-gray-400 line-through text-sm">
              {formatCurrency(price)}
            </span>
          )}
        </div>

        {/* Danh mục */}
        <span className="text-xs text-gray-400">
          Danh mục: {category?.categoryName || "Không xác định"}
        </span>

        <div className="flex flex-row justify-self-start gap-4 items-center">

          {/* Mua ngay */}

          <Button
            onClick={() => handleClickBuy()}
            variant="contained"
            color="error"
            sx={{ width: 110, height: 40, fontSize: 14 }}
          >Buy
          </Button>
        </div>
      </div>
    </div>
  );
}
