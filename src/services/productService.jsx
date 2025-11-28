import axios from 'axios';
const instance = axios.create({
  baseURL: '/api/v1/products',
  withCredentials: true,
});

const productService = {
  getAllProducts: () => instance.get(`/all`),
  getAllProductsByPage: (page, size, sortBy, direction) => instance.get(`/page`, { params: { page, size, sortBy, direction } }),
  getProductByCategoryName: (categoryName, page, size, sortBy, direction) => instance.get(
    `/category/by-category-name`,
    { params: { categoryName, page, size, sortBy, direction } }
  ),
  getProductById: (productId) => instance.get(`/product/${productId}`),
  createProduct: (data) => instance.post(`/add`, data),
  updateProduct: (productId, data) => instance.put(`/${productId}`, data),
  deleteProduct: (productId) => instance.delete(`/${productId}`)
};

export default productService;