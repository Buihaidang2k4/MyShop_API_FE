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
import {
    formatCurrency,
    convertSoldCount,
    convertAvgRating
} from "./sample/FomartProduct";
import InfoRow from "./sample/InfoRow";
import useAddItemToCart from "../../hooks/cart-item/useAddItemToCart";
import useUserInfor from "@/hooks/user/useUserInfor";
import { notify } from "../../utils/notify";
import { useNavigate } from "react-router-dom";


export default function ProductDetails({ product }) {
    // chuyển hướng 
    const navigate = useNavigate();
    // Thông tin user
    const { data: user, isError: errorUser, isLoading: loadingUser } = useUserInfor();
    // Danh sách sản phẩm liên quan 
    const [page, setPage] = useState(0);
    const { data, isError: errorList, isLoading: loadingList } = useProducts(page, 5, "productId", "asc");
    const productList = data?.data?.data?.content || [];
    const totalPages = data?.data.data.totalPages || 1;

    // sản phẩm
    const {
        productId,
        productName,
        description,
        origin,
        bio,
        slug,
        height,
        length,
        weight,
        width,
        price,
        specialPrice,
        soldCount,
        reviewCount,
        avgRating,
        discount,
        inventory,
        category,
    } = product;

    // console.log(inventory?.available)
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

    // number product
    const [quantityProduct, setQuantityProduct] = useState(1);
    const handleIncreaseQuantity = () => {
        setQuantityProduct(quantityProduct + 1);
    }
    const handleDecreaseQuantity = () => {
        setQuantityProduct(quantityProduct > 0 ? quantityProduct - 1 : 0);
    }

    // Tồn kho 
    function InventoryStatus({ inventory }) {
        const available = inventory?.available;

        // Xử lý logic hiển thị trước
        let statusText = "Hết hàng";
        let statusClass = "text-red-600";

        if (available !== undefined && available !== null) {
            statusText = `${available} sản phẩm có sẵn`;
            statusClass = available > 0 ? "text-sky-600" : "text-red-600";
        }

        return <span className={`pl-5 ${statusClass}`}>{statusText}</span>;
    }

    // chi tiết sản phẩm 
    function ProductDetail({ inventory, origin, height, length, weight }) {
        return (
            <div className="flex flex-col w-full p-3">
                <InfoRow
                    label="Số lượng trong kho"
                    value={inventory?.available > 0 ? "Còn hàng" : "Hết hàng"}
                />
                <InfoRow
                    label="Nguồn gốc xuất xứ"
                    value={origin || "Rõ ràng"}
                />
                <InfoRow
                    label="Chiều cao"
                    value={height ? `${height} cm` : "Trung bình"}
                />
                <InfoRow
                    label="Chiều dài"
                    value={length ? `${length} cm` : "Trung bình"}
                />
                <InfoRow
                    label="Cân nặng"
                    value={weight ? `${weight} kg` : "100g"}
                />
            </div>
        );
    }

    // thêm sản phẩm giỏ hàng 
    const { mutate: addItem, isLoading: loadingAddItem, isError: errorAddItem } = useAddItemToCart();

    const handleAddToCart = () => {
        const cartId = user?.userProfile?.cartResponse?.cartId;
        const quantity = quantityProduct;
        const productId = product?.productId;

        if (!cartId) {
            notify.error("Giỏ hàng không hợp lệ");
            return;
        }
        if (!productId) {
            notify.error("Sản phẩm không hợp lệ");
            return;
        }
        if (!quantity || quantity <= 0) {
            notify.info("Vui lòng điều chỉnh số lượng sản phẩm");
            return;
        }

        addItem({ cartId, productId, quantity });
    };

    // Xử lý mua hàng 
    const handleClickBuyNow = () => {
        // Logic xử lý mua hàng ngay
        if (quantityProduct <= 0) {
            notify.info("Vui lòng chọn số lượng sản phẩm hợp lệ");
            return;
        }


        navigate(`/order?productId=${product?.productId}&quantity=${quantityProduct}`);
    }

    if (!product || imageLoading || loadingList || reviewLoading || loadingAddItem || loadingUser) return <Loading />
    if (imageError || errorList, reviewError || errorAddItem || errorUser) return <Error message={imageError.message || errorList.message || reviewError.message} />

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
                        {/* Giá tiền đặc biệt  */}
                        <div className="flex items-center gap-4 mb-4 bg-amber-50 p-5">
                            <span className="text-2xl font-bold text-red-600">
                                {formatCurrency(specialPrice)} - {formatCurrency(price + 40000)}
                            </span>
                            {discount > 0 && price && (
                                <span className="text-gray-400 line-through">
                                    {formatCurrency(price)}
                                </span>
                            )}
                        </div>

                        {/* Đánh giá sao */}
                        <div className="flex items-center mb-4">
                            {/* trung bình đánh giá sao  */}
                            <span className="text-yellow-400">{convertAvgRating(avgRating) || ""}</span>
                            {/* Số lượt đánh giá */}
                            <span className="inline-block w-px h-5 bg-gray-400 mx-2"></span>
                            <span className="text-gray-500 ml-2">Đánh Giá <strong className="text-gray-800 font-bold text-lg underline">{reviewCount !== null ? convertSoldCount(reviewCount) : "0"}</strong> </span>
                            {/* Số lượt bán  */}
                            <span className="inline-block w-px h-5 bg-gray-400 mx-2"></span>
                            <span className="text-gray-500 ml-2"> Đã Bán <strong className="text-gray-800 font-bold text-lg underline">{soldCount !== null ? convertSoldCount(soldCount) : "0"}</strong></span>
                        </div>

                        {/* Mô tả sản phẩm */}
                        <div className="text-gray-700 mb-6 h-30"> <strong className="text-gray-800 text-[15px] ">Mô tả:</strong> {description || ""}</div>

                        {/* Số lượng */}
                        <div className="flex items-center gap-3">
                            <span className="text-gray-700 pr-5">Số lượng</span>

                            <div className="flex items-center border rounded-lg overflow-hidden">
                                <button
                                    onClick={handleDecreaseQuantity}
                                    className="h-8 w-10 bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition"
                                >
                                    -
                                </button>
                                <input
                                    readOnly
                                    value={quantityProduct}
                                    type="text"
                                    className="h-8 w-16 text-center bg-white text-gray-700 focus:outline-none"
                                />
                                <button
                                    onClick={handleIncreaseQuantity}
                                    className="h-8 w-10 bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition"
                                >
                                    +
                                </button>
                            </div>

                            {/* Tình trạng kho */}
                            <span className="text-gray-700 pl-5">
                                {InventoryStatus({ inventory })}
                            </span>
                        </div>

                    </div>

                    <div className="flex gap-4">
                        {/* Thêm giỏ hàng */}
                        <button
                            onClick={handleAddToCart}
                            className=" border border-blue-600 text-blue-600 px-10 py-2 rounded-lg 
                             hover:bg-blue-50 active:scale-105 transition transform duration-150 hover:scale-105"
                        >
                            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                        </button>

                        {/* Mua ngay */}
                        <button
                            onClick={handleClickBuyNow}
                            className="bg-blue-600 text-white px-20 py-2 rounded-lg font-semibold
                           hover:bg-blue-700 active:scale-105 transition transform duration-150 hover:scale-105 shadow-md"
                        >
                            Buy
                        </button>

                    </div>
                </div>
            </div>

            {/* Mô tả sản phẩm chiều cao cân nặng*/}
            <div className="mt-10 border-t-2 border-gray-200  w-full">
                <h2 className="uppercase p-3 text-2xl bg-gray-100">
                    Chi tiết sản phẩm
                </h2>
                {/* chi tiết sản phẩm */}
                {ProductDetail({ inventory, origin, height, length, weight })}
            </div>

            {/* products liên quan */}
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
