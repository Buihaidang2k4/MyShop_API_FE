import { useState } from "react";
import { useLocation } from "react-router-dom";
import useFindProductByCategoryName from "../hooks/product/useFindProductByCategoryName";
import ProductList from "../components/product-list/ProductList";
import Loading from "../utils/Loading";
import Error from "../utils/Error";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faTags, faClock } from '@fortawesome/free-solid-svg-icons';
import Banner from "@/components/layout/Banner";

export default function SearchPageByCategory() {
    const [page, setPage] = useState(0);
    const [sortBy, setSortBy] = useState("");
    const [sortDirection, setSortDirection] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryName = queryParams.get("categoryName");

    const { data, isLoading, isError } = useFindProductByCategoryName(
        categoryName ? categoryName : "",
        page,
        10,
        sortBy,
        sortDirection
    );

    if (isLoading) return <Loading />;
    if (isError) {
        console.error(isError);
        return <Error message={isError.message} />;
    }

    const products = data?.data?.data?.content;
    const totalPages = data?.data?.data?.totalPages;

    const listAction = [
        { label: "Tất cả", value: 0, icon: faClock },
        { label: "Giá tăng dần", value: 1, icon: faArrowUp },
        { label: "Giá giảm dần", value: 2, icon: faArrowDown },
        { label: "Giá sau giảm tăng dần", value: 3, icon: faArrowUp },
        { label: "Giá sau giảm giảm dần", value: 4, icon: faArrowDown },
        { label: "Sản phẩm đang giảm giá nhiều", value: 5, icon: faTags },
        { label: "Mới nhất", value: 6, icon: faClock },
        { label: "Cập nhật gần nhất", value: 7, icon: faClock },
        { label: "Tên danh mục A → Z", value: 8, icon: faArrowUp },
        { label: "Tên danh mục Z → A", value: 9, icon: faArrowDown }
    ];

    const handleClickAction = (action) => {
        switch (action) {
            case 1:
                setSortBy("price");
                setSortDirection("asc");
                break;
            case 2:
                setSortBy("price");
                setSortDirection("desc");
                break;
            case 3:
                setSortBy("specialPrice");
                setSortDirection("asc");
                break;
            case 4:
                setSortBy("specialPrice");
                setSortDirection("desc");
                break;
            case 5:
                setSortBy("discount");
                setSortDirection("desc");
                break;
            case 6:
                setSortBy("createAt");
                setSortDirection("desc");
                break;
            case 7:
                setSortBy("updateAt");
                setSortDirection("desc");
                break;
            case 8:
                setSortBy("category.categoryName");
                setSortDirection("asc");
                break;
            case 9:
                setSortBy("category.categoryName");
                setSortDirection("desc");
                break;
            default:
                setSortBy("productId");
                setSortDirection("asc");
        }
        setPage(0); // Reset page khi thay đổi sort
    };

    return (
        <>
            <Banner />
            {/* Action sort */}
            <div className="bg-white p-4 border-t border-gray-300">
                <h2 className="text-xl font-bold text-gray-800 mb-4 relative text-left inline-block">
                    Sắp xếp theo
                </h2>
                <div className="flex gap-2 flex-wrap justify-start">
                    {listAction.map(({ label, value, icon }) => (
                        <button
                            key={value}
                            onClick={() => handleClickAction(value)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg
                            bg-gradient-to-r from-sky-100 to-indigo-100
                            text-sky-800 font-semibold shadow-sm
                            hover:from-sky-200 hover:to-indigo-200
                            hover:shadow-md active:scale-95
                            transition-all duration-200 ease-out
                            border border-sky-200"
                        >
                            <FontAwesomeIcon icon={icon} className="text-sky-600" />
                            {label}
                        </button>
                    ))}
                </div>
            </div>


            <ProductList
                products={products}
                totalPages={totalPages}
                page={page}
                setPage={setPage}
            />
        </>
    );
}
