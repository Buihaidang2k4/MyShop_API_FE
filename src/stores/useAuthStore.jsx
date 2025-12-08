import { create } from "zustand";
import { persist } from "zustand/middleware";
import authService from "@/services/authService";
import userService from "@/services/userService";
import { notify } from "../utils/notify";
let refreshTimeout = null;

const useAuthStore = create(
    persist(
        (set, get) => ({
            isLoggedIn: false,
            loading: true,
            user: null,
            //  Login
            login: async (email, password) => {
                try {
                    const resLogin  =  await authService.login({ email, password });
                    console.log(resLogin);
                    const resInfo = await userService.getMyInfo();
                    const resUser = resInfo.data.data;
                    set({
                        isLoggedIn: true,
                        user: resUser,
                    });
                    notify.success("Đăng nhập thành công")
                    get().startTokenWatcher();
                    return true;
                } catch (error) {
                    console.error("❌ Đăng nhập thất bại: ", error);
                    notify.error("Đăng nhập thất bại vui lòng thử lại !");
                    set({ isLoggedIn: false, user: null });
                    return false;
                }
            },
            // Logout
            logout: async () => {
                try {
                    await authService.logout();
                } catch (error) {
                    console.error("❌ Đăng xuất thất bại: ", error);
                } finally {
                    clearTimeout(refreshTimeout);
                    set({ isLoggedIn: false, user: null });
                    console.log("✅ Đăng xuất thành công");
                    notify.success("Đăng xuất thành công");
                }
            },
            //  Check login status
            checkLogin: async () => {
                try {
                    const { valid } = await authService.verifyToken();
                    if (valid) {
                        set({ isLoggedIn: true });
                        console.log("✅ Token hợp lệ, đã đăng nhập");
                        notify.info("Chào mừng bạn !")
                        // bắt đầu auto refresh token
                        get().startTokenWatcher();
                    } else {
                        try {
                            await authService.refresh_token();
                            const recheck = await authService.verifyToken();
                            set({ isLoggedIn: recheck.valid });
                            if( recheck.valid ) get.startTokenWatcher();
                            console.log("✅ Đã refresh token thành công");
                        } catch (error) {
                            set({ isLoggedIn: false });
                            console.error("❌ Token không hợp lệ sau refresh token: ", error);
                        }
                    }
                } catch (error) {
                    set({ isLoggedIn: false });
                    console.error("❌ Error verify token: ", error);
                } finally {
                    set({ loading: false });
                }
            },
            // auto refresh token
            startTokenWatcher: async () => {
                clearTimeout(refreshTimeout);
                try {
                    const { valid, exp } = await authService.verifyToken();
                    if (!valid) return;

                    const expTime = isNaN(exp) ? new Date(exp).getTime() : exp * 1000;
                    const now = Date.now();
                    const timeLeft = expTime - now;

                    if (timeLeft <= 0) {
                        console.warn("Token hết hạn, refresh ngay lập tức");
                        await authService.refresh_token();
                        return get().startTokenWatcher();
                    }

                    const refreshBefore = 60 * 1000; // 1 minute
                    const refreshIn = Math.max(timeLeft - refreshBefore, 0);

                    console.log(
                        `🕒 Token còn ${(timeLeft / 60000).toFixed(1)} phút. 
                        Sẽ refresh sau ${(refreshIn / 1000).toFixed(1)} giây.`
                    );

                    refreshTimeout = setTimeout(async () => {
                        try {
                            const refreshRes = await authService.refresh_token();
                            console.info("Token refreshed:", refreshRes.data.message);
                            // gọi lại cho token mới 
                            get().startTokenWatcher();
                        } catch (error) {
                            console.error("Error refreshing token:", error);
                            set({ isLoggedIn: false });
                        }
                    }, refreshIn);
                } catch (error) {
                    console.error("Lỗi khi theo dõi token:", error);
                }
            }
        }),
        {
            name: "auth-storage",
        }
    )
);

export default useAuthStore;