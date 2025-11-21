import axios from 'axios';
// Dùng proxy giống auth để tránh CORS và giữ same-origin
const instance = axios.create({
  baseURL: '/api/v1/products',
  withCredentials: true,
});

const productService = {
  getAllProducts: () => instance.get(`/all`),
  getProductById: (id) => instance.get(`/${id}`),
  createProduct: (data) => instance.post(``, data),
  updateProduct: (id, data) => instance.put(`/${id}`, data),
  deleteProduct: (id) => instance.delete(`/${id}`)
};

export default productService;