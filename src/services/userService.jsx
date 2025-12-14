import apiBase from "./apiBase";

const userService = {
    getAll: () => apiBase.get(`/users/all`),
    getUsersById: (userId) => apiBase.get(`/users/${userId}`),
    getMyInfo: () => apiBase.get(`/users/myInfo`),
    createUser: (data) => apiBase.post(`/users/add`, data, {withCredentials: false}),
    updateUser: (userId, data) => apiBase.put(`/users/${userId}`, data),
    changePassword: (userId, data) => apiBase.put(`/users/${userId}/change-password`, data),
    deleteUser: (userId) => apiBase.delete(`/users/${userId}`),
};

export default userService;