import axios from "axios";
// Dùng proxy của Vite trong môi trường dev để đảm bảo same-origin và gửi cookie
const BASE_URL = `/api/v1/carts`;

const instance = axios.create(
    {
        baseURL: BASE_URL,
        withCredentials: true, // cookies auto
    }
);
const cartService = {
    getCartByProfileId: (profileId) => instance.get(`/cart/user-profile/${profileId}`),
    clearCart: (cartId) => instance.get(`/cart/${cartId}/clear`),
};
export default cartService;