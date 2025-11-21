import { useRef, useEffect } from "react";
import authService from "@/services/authService";
import useAuthStore from "@/stores/useAuthStore";

export default function useAutoRefreshToken() {
  const { isLoggedIn } = useAuthStore();
  const timeoutRef = useRef(null);

  useEffect(() => {
    // ❌ Không đăng nhập => không kiểm tra token
    if (!isLoggedIn) {
      return;
    }
    const checkExpToken = async () => {
      try {
        const { valid, exp } = await authService.verifyToken();
        console.log("Verify token:", valid, exp);
        if (!valid) return;

        const expTime = isNaN(exp) ? new Date(exp).getTime() : exp * 1000;
        const now = Date.now();
        const timeLeft = expTime - now;

        console.log("Token introspect:", valid, exp, "Time left (ms):", timeLeft);

        //  Thời gian trước khi hết hạn 1p
        const refreshBefore = 60 * 1000;
        const refreshIn = Math.max(timeLeft - refreshBefore, 0);
        console.log(
          `🕒 Token hết hạn sau ${(timeLeft / 60000).toFixed(1)} phút. 
           Sẽ refresh sau ${(refreshIn / 1000).toFixed(1)} giây.`
        );

        timeoutRef.current = setTimeout(async () => {
          try {
            const refreshRes = await authService.refresh_token();
            console.info("Token refreshed:", refreshRes.data.message);
            // gọi lại để tiếp tục kiểm tra
            checkExpToken();
          } catch (error) {
            console.error("Error refreshing token:", error);
          }

        }, refreshIn);
      } catch (error) {
        console.error("Auto refresh error:", error);
      }
    };

    checkExpToken();
    return () => clearTimeout(timeoutRef.current);
  }, [isLoggedIn]);
}
