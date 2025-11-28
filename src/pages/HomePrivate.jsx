import useProducts from "../hooks/product/useProducts";
import { useState } from "react";
import Loading from "../utils/Loading";
import Error from "../utils/Error";
import Banner from "../components/layout/Banner"
import Category from "../components/layout/Category";
import ProductList from "../components/product-list/ProductList";


export default function HomePrivate() {
    const [page, setPage] = useState(0);

    const { data, isLoading, isError, isFetching } = useProducts(page, 10);

    const products = data?.data?.data?.content || [];
    const totalPages = data?.data?.data?.totalPages || 1;

    if (isLoading) return <Loading />;
    if (isError) return <Error />

    return (
        <>
            <Banner />
            <Category />
            <div className="relative">
                {isFetching && <Loading />}
                <ProductList
                    products={products}
                    totalPages={totalPages}
                    page={page}
                    setPage={setPage}
                />
            </div>
        </>
    )
}