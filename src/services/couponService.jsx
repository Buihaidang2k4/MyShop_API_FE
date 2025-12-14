import apiBase from "./apiBase";

const couponService = {
    getCoupons: () => apiBase.get(`/coupons/coupon-available`),
    createCoupon: ({data}) => apiBase.get(`/coupons/api/v1/coupons/coupon/create`,data),
};

export default couponService;