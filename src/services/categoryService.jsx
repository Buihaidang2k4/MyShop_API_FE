import apiBase from "./apiBase";

const categoryService = {
    getAllCategories: () => apiBase.get(`/categories/all`),
    getCategoryById: (categoryId) => apiBase.get(`/categories/category/${categoryId}`),
    getCategoryName: (categoryName) => apiBase.get(`/categories/category/categoryName/${categoryName}`),
    createCategory: (data) => apiBase.post(`/categories/category/add`, data),
    updateCategory: (categoryId, data) => apiBase.put(`/categories/category/${categoryId}/update`, data),
    deleteCategory: (categoryId) => apiBase.delete(`/categories/category/${categoryId}/delete`)
};

export default categoryService;