import apiBase from "./apiBase";

const orderSevice = {
    getOrders: ({ orderStatus, page, size, sortBy, direction }) =>
        apiBase.get("orders/status-page", { params: { orderStatus, page, size, sortBy, direction } }),

    getOrderById: (orderId) => apiBase.get(`orders/order/${orderId}`),

    placeOrderFromItems: ({ data }) =>
        apiBase.post("orders/from-cart-items", data),

    placeOrderBuyNow: ({ data }) =>
        apiBase.post(
            "orders/buy-now",
            data,
        ),
    cancelOrder: (orderId) => apiBase.put(`orders/order/${orderId}/cancelOrder`)
};

export default orderSevice;
