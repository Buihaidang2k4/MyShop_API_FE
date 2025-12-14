import { create } from "zustand";
import { persist } from "zustand/middleware";
import authService from "@/services/authService";
import userService from "@/services/userService";
import { notify } from "../utils/notify";
let refreshTimeout = null;

const parseExpToMs = (exp) => {
    if (!exp) return null;

    // number → unix timestamp (seconds)
    if (typeof exp === "number") {
        return exp * 1000;
    }

    // string number → "1736676000"
    if (!isNaN(Number(exp))) {
        return Number(exp) * 1000;
    }

    // ISO string → "2025-01-12T10:00:00Z"
    const parsed = Date.parse(exp);
    return isNaN(parsed) ? null : parsed;
};

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            role: null,
            loading: false,
            isLoggedIn: false,
            exp: null,

            //  ======= LOGIN ==========
            login: async (email, password) => {
                set({ loading: true });
                try {
                    await authService.login({ email, password });

                    const resInfo = await userService.getMyInfo();
                    const user = resInfo.data.data;
                    const role = user.roles[0].roleName;

                    const { exp } = await authService.verifyToken();
                    const expMs = parseExpToMs(exp);
                    if (!expMs) {
                        console.error("Invalid token exp format:", exp);
                        return;
                    }


                    set({
                        user,
                        role,
                        loading: false,
                        isLoggedIn: true,
                        exp: expMs,
                    });

                    get().startTokenWatcher();
                    notify.success("Đăng nhập thành công")

                    return { success: true, role };
                } catch (error) {
                    set({
                        user: null,
                        loading: false,
                        role: null,
                        exp: null,
                        isLoggedIn: false,
                    });

                    console.error("❌ Đăng nhập thất bại: ", error);
                    notify.error("Đăng nhập thất bại vui lòng thử lại !");

                    return { success: false };
                }
            },

            // =========== LOGOUT ================
            logout: async () => {
                clearTimeout(refreshTimeout);
                await authService.logout();
                set({ isLoggedIn: false, user: null, role: null });
                console.log("Đăng xuất thành công");
            },

            // ============== TOKEN WATCHER ===============
            startTokenWatcher: async () => {
                clearTimeout(refreshTimeout);

                try {
                    const { valid, exp } = await authService.verifyToken();
                    if (!valid) return;

                    const expTime = parseExpToMs(exp);
                    if (!expTime) {
                        console.error("Invalid token exp format:", exp);
                        return;
                    }

                    const timeLeft = expTime - Date.now();



                    if (timeLeft <= 0) {
                        await authService.refresh_token();
                        return get().startTokenWatcher();
                    }

                    const refreshBefore = 60_000;
                    const refreshIn = Math.max(timeLeft - refreshBefore, 0);

                    console.log(
                        `🕒 Token còn ${(timeLeft / 60000).toFixed(1)} phút. 
                        Sẽ refresh sau ${(refreshIn / 1000).toFixed(1)} giây.`
                    );

                    refreshTimeout = setTimeout(async () => {
                        try {
                            await authService.refresh_token();
                            get().startTokenWatcher();
                        } catch {
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