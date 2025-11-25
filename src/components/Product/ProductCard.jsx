import useImageUrl from "@/hooks/image/useImageUrl";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";


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
            {specialPrice.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
          {discount > 0 && (
            <span className="text-gray-400 line-through text-sm">
              {price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          )}
        </div>

        {/* Danh mục */}
        <span className="text-xs text-gray-400">
          Danh mục: {category?.categoryName || "Không xác định"}
        </span>

        <div className="flex flex-row justify-self-start gap-4 items-center">
          {/* Thêm giỏ hàng */}
          {/* <button
            className="mt-2 border border-blue-600 text-blue-600 px-3 py-2 rounded-lg 
               hover:bg-blue-50 active:scale-105 transition transform duration-150 hover:scale-105"
          >
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
          </button> */}

          {/* Mua ngay */}
          <button
            onClick={() => { navigate(`/product-details?productId=${product.productId}`); }}
            className="mt-2 bg-blue-600 text-white px-10 py-2 rounded-lg font-semibold
               hover:bg-blue-700 active:scale-105 transition transform duration-150 hover:scale-105 shadow-md"
          >
            Buy
          </button>
        </div>


      </div>
    </div>
  );
}
