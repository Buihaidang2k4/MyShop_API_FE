import apiBase from "./apiBase";
import authService from "./authService";
import useAuthStore from "../stores/useAuthStore";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach(p =>
        error ? p.reject(error) : p.resolve()
    );
    failedQueue = [];
};

apiBase.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Không có response → network error
        if (!error.response) {
            return Promise.reject(error);
        }

        // Token hết hạn
        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => apiBase(originalRequest));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await authService.refreshToken();
                processQueue(null);
                return apiBase(originalRequest);
            } catch (err) {
                processQueue(err);
                useAuthStore.getState().logout();
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);
