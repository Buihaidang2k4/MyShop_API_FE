import axios from "axios";
const BASE_URL = `/api/v1/auth`;

const instance = axios.create(
  {
    baseURL: BASE_URL,
    withCredentials: true, 
  }
);

const authService = {
  login: (data) => instance.post(`/login`, data),
  loginGoogle: (token) => instance.post(`/google`, { token },
    { headers: { 'Content-Type': 'application/json' } }
  ),
  register: (data) => instance.post(`/register`, data),
  logout: () => instance.post(`/logout`),
  refresh_token: () => instance.post(`/refresh`),
  introspect: () => instance.post(`/introspect`),
  verifyToken: async () => {
    try {
      const res = await instance.post(`/introspect`);
      if (res.status === 200) {
        return res.data.data; 
      }
      return { valid: false };
    } catch (error) {
      console.error("Error verify token:", error);
      return { valid: false };
    }
  }

};

export default authService;