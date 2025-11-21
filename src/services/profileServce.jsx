import axios from "axios";
// Dùng proxy của Vite trong môi trường dev để đảm bảo same-origin và gửi cookie
const BASE_URL = `/api/v1/profiles`;

const instance = axios.create(
    {
        baseURL: BASE_URL,
        withCredentials: true, // cookies auto
    }
);

const userService = {
    getAll: () => instance.get(`/all`),
    getUsersById: (profileId) => instance.get(`/${profileId}`),
    createOrUpdateProfile: (userId,data) => instance.post(`/users/${userId}/createOrUpdateProfile`, data),
};
export default userService;