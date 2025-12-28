import apiBase from "./apiBase";

const productService = {
  searchByUsers: (params) =>
    apiBase.get("/products/search", { params }),
  getAllProducts: () => apiBase.get(`/products/all`),
  getAllProductsByPage: (page, size, sortBy, direction) => apiBase.get(`/products/page`, { params: { page, size, sortBy, direction } }),
  getProductByCategoryName: (categoryName, page, size, sortBy, direction) => apiBase.get(
    `/products/category/by-category-name`,
    { params: { categoryName, page, size, sortBy, direction } }
  ),
  getProductById: (productId) => apiBase.get(`/products/product/${productId}`),
  createProduct: (data) => apiBase.post(`/products/add`, data),
  updateProduct: (productId, data) => apiBase.put(`/products/${productId}`, data),
  deleteProduct: (productId) => apiBase.delete(`/products/${productId}`)
};

export default productService;