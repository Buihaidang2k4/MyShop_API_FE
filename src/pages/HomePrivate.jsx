import Category from "../components/category/Category";
import Banner from "../components/Home/Banner";
import ProductList from "../components/Product/ProductList";

export default function HomePublic() {
    return (
        <>
            <Banner/>
            <Category/>
            <ProductList />
        </>
    )
}