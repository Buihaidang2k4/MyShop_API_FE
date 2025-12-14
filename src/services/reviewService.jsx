import apiBase from "./apiBase";

const reviewService = {
    getReviewsByProductId: (productId, { page, size, sortBy, direction }) => apiBase.get(`/reviews/product/${productId}`, { params: { page, size, sortBy, direction } }),
    createProduct: (data, { profileId, orderId, productId }) => apiBase.post(`/reviews/create-review`,
        data, { params: { productId, orderId, profileId } }),
};

export default reviewService;