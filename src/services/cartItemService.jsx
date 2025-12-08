import axios from "axios";
// Dùng proxy của Vite trong môi trường dev để đảm bảo same-origin và gửi cookie
const BASE_URL = `/api/v1/cartItems`;

const instance = axios.create(
    {
        baseURL: BASE_URL,
        withCredentials: true,
    }
);
const cartItemService = {
    getCartItems: (cartId, cartItemId) => instance.get(`/cart/${cartId}/cartItem/${cartItemId}`),
    addItemToCart: ( {cartId, productId, quantity} ) =>
        instance.post("/cartItem/addItemToCart", null,
            {
                params: { cartId, productId, quantity },
            }),
    updateItemQuantity: (cartId, cartItemId, quantity) => instance.put(`/cart/${cartId}/cartItem/${cartItemId}/updateItemQuantity/${quantity}`),
    removeItemFromCart: ({cartId, cartItemId}) => instance.delete(`/cart/${cartId}/cartItem/${cartItemId}/removeItemFromCart`),
};

export default cartItemService;