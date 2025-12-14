import apiBase from "./apiBase";


const userService = {
    getAll: () => apiBase.get(`/profiles/all`),
    getUsersById: (profileId) => apiBase.get(`/profiles/${profileId}`),
    createOrUpdateProfile: (userId,data) => apiBase.post(`/profiles/user/${userId}/createOrUpdateProfile`, data),
};
export default userService;