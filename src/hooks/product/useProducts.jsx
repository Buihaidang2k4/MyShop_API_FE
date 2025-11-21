import { useState, useEffect } from "react";
import productService from "../../services/productService";
import "react-multi-carousel/lib/styles.css";

export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        productService
            .getAllProducts()
            .then(res => {
                setProducts(res.data.data || []);
            })
            .catch((err) => {
                console.log("Error get all products: ", err)
                setError(err);
            }
            )
            .finally(
                () => setLoading(false)
            )
    }, []);

    return { products, loading, error };
}
