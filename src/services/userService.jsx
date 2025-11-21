import axios from "axios";
// Dùng proxy của Vite trong môi trường dev để đảm bảo same-origin và gửi cookie
const BASE_URL = `/api/v1/users`;

const instance = axios.create(
    {
        baseURL: BASE_URL,
        withCredentials: true,
    }
);

const userService = {
    getAll: () => instance.get(`/all`),
    getUsersById: (userId) => instance.get(`/${userId}`),
    getMyInfo: () => instance.get(`/myInfo`),
    createUser: (data) => instance.post(`/add`, data, {withCredentials: false}),
    updateUser: (userId, data) => instance.put(`/${userId}`, data),
    changePassword: (userId, data) => instance.put(`/${userId}/change-password`, data),
    deleteUser: (userId) => instance.delete(`/${userId}`),
};

export default userService;