import apiBase from "./apiBase";

const cartItemService = {
    getCartItems: (cartId, cartItemId) => apiBase.get(`/cartItems/cart/${cartId}/cartItem/${cartItemId}`),
    addItemToCart: ( {cartId, productId, quantity} ) =>
        apiBase.post("/cartItems/cartItem/addItemToCart", null,
            {
                params: { cartId, productId, quantity },
            }),
    updateItemQuantity: (cartId, cartItemId, quantity) => apiBase.put(`/cartItems/cart/${cartId}/cartItem/${cartItemId}/updateItemQuantity/${quantity}`),
    removeItemFromCart: ({cartId, cartItemId}) => apiBase.delete(`/cartItems/cart/${cartId}/cartItem/${cartItemId}/removeItemFromCart`),
};

export default cartItemService;