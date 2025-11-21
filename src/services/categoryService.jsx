import axios from 'axios';
const instance = axios.create({
    baseURL: '/api/v1/categories',
    withCredentials: true,
});

const categoryService = {
    getAllCategories: () => instance.get(`/all`),
    getCategoryById: (categoryId) => instance.get(`/category/${categoryId}`),
    getCategoryName: (categoryName) => instance.get(`category/categoryName/${categoryName}`),
    createCategory: (data) => instance.post(`/category/add`, data),
    updateCategory: (categoryId, data) => instance.put(`/category/${categoryId}/update`, data),
    deleteCategory: (categoryId) => instance.delete(`/category/${categoryId}/delete`)
};

export default categoryService;