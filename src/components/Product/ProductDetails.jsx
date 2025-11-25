import { useState } from "react";
import useImageUrl from "@/hooks/image/useImageUrl";

export default function ProductDetails({ product }) {
    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-500">
                Loading sản phẩm...
            </div>
        );
    }

    const {
        productName,
        description,
        price,
        discount,
        specialPrice,
        category,
        images = [],
    } = product;

    const imageUrl = useImageUrl(images);


    // State để quản lý ảnh đang hiển thị
    const [selectedImage, setSelectedImage] = useState(images[0] || "/placeholder.png");

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Gallery ảnh */}
                <div>
                    <div className="w-full h-96 mb-4">
                        <img
                            src={selectedImage}
                            alt={productName}
                            className="w-full h-full object-cover rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img || "/placeholder.png"}
                                alt={`${productName}-${idx}`}
                                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer 
                  ${selectedImage === img ? "border-blue-600" : "border-gray-200"}`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{productName}</h1>
                        <p className="text-sm text-gray-500 mb-4">
                            Danh mục: {category?.categoryName || "Không xác định"}
                        </p>

                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-2xl font-bold text-red-600">
                                {specialPrice?.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                            </span>
                            {discount > 0 && price && (
                                <span className="text-gray-400 line-through">
                                    {price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                </span>
                            )}
                        </div>

                        <p className="text-gray-700 mb-6">{description || "Không có mô tả"}</p>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105">
                            Thêm vào giỏ
                        </button>
                        <button className="w-12 h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 hover:scale-105 transition">
                            ❤️
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
