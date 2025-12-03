import { useState } from "react";
import Banner from "../components/layout/Banner"
import Category from "../components/layout/Category";
import ProductList from "../components/product-list/ProductList";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "@/utils/ConfirmDialog.jsx";
import useProducts from "@/hooks/product/useProducts.jsx";
import useAuthStore from "@/stores/useAuthStore.jsx";
import notify from "@/utils/notify.jsx";

export default function HomePublic() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, isFetching } = useProducts(page, 10);
  const products = data?.data?.data?.content || [];
  const totalPages = data?.data?.data?.totalPages || 1;

  return (
    <>
      <Banner />
      <Category />
      <div
        className="relative">
        <ProductList
          products={products}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
        />
      </div>

    </>
  );
}
