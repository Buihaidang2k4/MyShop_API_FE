import apiBase from "./apiBase";

const userService = {
    getAll: () => apiBase.get(`/address/all`),
    getAddressById: (addressId) => apiBase.get(`/address/${addressId}`),
    updateAddress: (data, { profileId, addressId }) => apiBase.put(`/address/update`, data, { params: { profileId, addressId } }),
    createAddress: (profileId, data) => apiBase.put(`/address/address/user-profile/${profileId}/add`, data),
};
export default userService;