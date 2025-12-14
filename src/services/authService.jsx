import apiBase from "./apiBase";

const authService = {
  login: (data) => apiBase.post(`/auth/login`, data),
  loginGoogle: (token) => apiBase.post(`/auth/google`, { token },
    { headers: { 'Content-Type': 'application/json' } }
  ),
  register: (data) => apiBase.post(`/auth/register`, data),
  forgotPassword:(data) => apiBase.post(`/auth/forgot-password`, data),
  resetPassword: (data) => apiBase.put(`/auth/reset-password`, data), // otp 
  logout: () => apiBase.post(`/auth/logout`),
  refresh_token: () => apiBase.post(`/auth/refresh`),
  introspect: () => apiBase.post(`/auth/introspect`),
  verifyToken: async () => {
    try {
      const res = await apiBase.post(`/auth/introspect`);
      if (res.status === 200) {
        return res.data.data; 
      }
      return { valid: false };
    } catch (error) {
      console.error("Error verify token:", error);
      return { valid: false };
    }
  },
};

export default authService;