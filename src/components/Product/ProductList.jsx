import ProductCard from "./ProductCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useProducts from "../../hooks/product/useProducts";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 6 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

export default function ProductList() {
  const { products, loading, error} = useProducts();
  
  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (error) return <p>Lỗi khi tải sản phẩm</p>;

  return (
    <>
      <h2 className="font-bold text-2xl p-5 text-sky-950">
        Danh sách sản phẩm
      </h2>

      <div className="p-10">
        {products.length > 0 ? (
          <Carousel responsive={responsive} infinite autoPlay>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Carousel>
        ) : (
          <p>Đang tải sản phẩm...</p>
        )}
      </div>
    </>
  )
}