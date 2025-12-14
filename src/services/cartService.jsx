import apiBase from "./apiBase";

const cartService = {
    getCartByProfileId: (profileId) => apiBase.get(`/carts/cart/user-profile/${profileId}`),
    clearCart: (cartId) => apiBase.get(`/carts/cart/${cartId}/clear`),
};
export default cartService;