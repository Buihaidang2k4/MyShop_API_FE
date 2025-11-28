import { useState } from "react";
import useFindImageByProductId from "../../hooks/image/useFindImageByProductId";
import Loading from "../../utils/Loading";
import Error from "../../utils/Error";
import logo from "../../assets/image/mylogo.png";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductList from "../product-list/ProductList";
import useProducts from "../../hooks/product/useProducts";
import useFindReviewByProductId from "@/hooks/review/useFindReviewByProductId";
import Review_detail from "./sample/Review_detail";

export default function ProductDetails({ product }) {

    //  products
    const [page, setPage] = useState(0);
    const { data, isError: errorList, isLoading: loadingList } = useProducts(page, 5, "productId", "asc");
    const productList = data?.data?.data?.content || [];
    const totalPages = data?.data.data.totalPages || 1;
    const {
        productId,
        productName,
        description,
        price,
        discount,
        specialPrice,
        category,
    } = product;

    //  image
    const [selectedImage, setSelectedImage] = useState(`${logo}`);
    const { data: images, isError: imageError, isLoading: imageLoading } = useFindImageByProductId(product?.productId);


    //  rating
    const { data: dataContainerReview = {}, isError: reviewError, isLoading: reviewLoading } = useFindReviewByProductId({ productId });
    const {
        reviews = [],
        totalItems: totalItemsReview = 0,
        totalPages: totalPagesReview = 0,
        size: sizeReview = 0,
        currentPage: currentPageReview = 0,
    } = dataContainerReview;



    if (!product || imageLoading || loadingList || reviewLoading) return <Loading />
    if (imageError || errorList, reviewError) return <Error message={imageError.message || errorList.message || reviewError.message} />

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
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
                                src={img}
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

                        <div className="flex items-center mb-4">
                            <span className="text-yellow-400">⭐⭐⭐⭐☆</span>
                            <span className="text-gray-500 ml-2">(123 đánh giá)</span>
                        </div>

                    </div>

                    <div className="flex gap-4">
                        {/* Thêm giỏ hàng */}
                        <button
                            className=" border border-blue-600 text-blue-600 px-10 py-2 rounded-lg 
                             hover:bg-blue-50 active:scale-105 transition transform duration-150 hover:scale-105"
                        >
                            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                        </button>

                        {/* Mua ngay */}
                        <button
                            className="bg-blue-600 text-white px-20 py-2 rounded-lg font-semibold
                           hover:bg-blue-700 active:scale-105 transition transform duration-150 hover:scale-105 shadow-md"
                        >
                            Buy
                        </button>
                    </div>
                </div>

            </div>

            {/* products */}
            <div className="mt-10 border-t-2 border-gray-200">
                <ProductList products={productList} totalPages={totalPages} page={page} setPage={setPage} />
            </div>

            {/* review */}

            <div className="">
                <h2 className="uppercase p-5 text-2xl">
                    Đánh giá sản phẩm 
                </h2>


                {/* comment */}
                {reviews.length > 0 &&
                    reviews.map((rv, idx) => (
                        <Review_detail review={rv} key={idx} />
                    ))
                }
            </div>
        </div>
    );
}
