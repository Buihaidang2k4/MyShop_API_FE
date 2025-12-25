import apiBase from "./apiBase";

const addresService = {
    getAll: () => apiBase.get("/address/all"),

    getAddressById: (addressId) =>
        apiBase.get(`/address/${addressId}`),

    getAddressByProfileId: (profileId) =>
        apiBase.get(`/address/profile/${profileId}`),

    updateAddress: ({ profileId, addressId, data }) =>
        apiBase.put(
            "/address/update",
            data,
            { params: { profileId, addressId } }
        ),

    createAddress: ({ profileId, data }) =>
        apiBase.post(
            `/address/user-profile/${profileId}/add`,
            data
        ),
};

export default addresService;
