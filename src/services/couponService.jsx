import axios from 'axios';
const instance = axios.create({
    baseURL: '/api/v1/coupons',
    withCredentials: true,
});

const couponService = {
    getCoupons: () => instance.get(`/coupon-available`),
    createCoupon: ({data}) => instance.get(`/api/v1/coupons/coupon/create`,data),
};

export default couponService;