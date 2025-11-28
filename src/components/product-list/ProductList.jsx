import ReactPaginate from "react-paginate";
import ProductCard from "./ProductCard";
import React from "react";

function ProductList({ products = [], totalPages = 1, page, setPage }) {

  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <div className="p-10">
      <h2 className="relative text-2xl font-bold mb-8 text-gray-800 text-center">
        <span className="px-4 bg-white relative z-10">Danh sách sản phẩm</span>
        <span className="absolute left-0 right-0 top-1/2 h-[3px] 
      bg-gradient-to-r from-transparent via-sky-400 to-transparent 
      rounded-full"></span>
      </h2>


      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-5">
        {products.map((p) => (
          <ProductCard key={p.productId} product={p} />
        ))}
      </div>

      <ReactPaginate
        previousLabel={"← Trước"}
        nextLabel={"Tiếp →"}
        breakLabel={"..."}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        forcePage={page}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        containerClassName={"flex justify-center gap-2 select-none"}
        pageClassName={"px-3 py-2 border rounded-lg bg-white hover:bg-sky-50 text-sky-800"}
        activeClassName={"bg-sky-600 text-white border-sky-600"}
        previousClassName={"px-4 py-2 border rounded-lg bg-white hover:bg-sky-50 text-sky-800"}
        nextClassName={"px-4 py-2 border rounded-lg bg-white hover:bg-sky-50 text-sky-800"}
        disabledClassName={"opacity-40 cursor-not-allowed"}
      />
    </div>
  );
}

export default React.memo(ProductList);