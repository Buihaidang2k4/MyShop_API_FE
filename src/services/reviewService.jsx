import axios from 'axios';
const instance = axios.create({
    baseURL: '/api/v1/reviews',
    withCredentials: true,
});
const reviewService = {
    getReviewsByProductId: (productId, { page, size, sortBy, direction }) => instance.get(`/product/${productId}`, { params: { page, size, sortBy, direction } }),
    createProduct: (data, { profileId, orderId, productId }) => instance.post(`/create-review`,
        data, { params: { productId, orderId, profileId } }),
};

export default reviewService;