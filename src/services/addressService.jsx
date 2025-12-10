import axios from "axios";
// Dùng proxy của Vite trong môi trường dev để đảm bảo same-origin và gửi cookie
const BASE_URL = `/api/v1/address`;

const instance = axios.create(
    {
        baseURL: BASE_URL,
        withCredentials: true, // cookies auto
    }
);

const userService = {
    getAll: () => instance.get(`/all`),
    getAddressById: (addressId) => instance.get(`/${addressId}`),
    updateAddress: (data, { profileId, addressId }) => instance.put(`/update`, data, { params: { profileId, addressId } }),
    createAddress: (profileId, data) => instance.put(`/address/user-profile/${profileId}/add`, data),
};
export default userService;