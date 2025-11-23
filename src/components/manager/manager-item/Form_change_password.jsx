import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useUserInfor from "@/hooks/user/useUserInfor";
import userService from "../../../services/userService";
export default function Form_change_password({ onClose }) {
    const queryClient = useQueryClient();
    const { data: user, isLoading } = useUserInfor();

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [submit, setSubmiting] = useState(false);

    if (isLoading || !user.userProfile) return <div>Loading...</div>;

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // clear error 
        setError("");
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { oldPassword, newPassword, confirmPassword } = formData;

        // Validate cơ bản
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("❌ Vui lòng nhập đầy đủ thông tin");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("❌ Mật khẩu xác nhận không khớp");
            return;
        }

        if (newPassword === oldPassword) {
            setError("❌ Mật khẩu mới không được trùng với mật khẩu cũ");
            return;
        }

        if (newPassword.length < 6) {
            setError("❌ Mật khẩu mới phải có ít nhất 6 ký tự");
            return;
        }

        setSubmiting(true);

        try {
            await userService.changePassword(user.id, {
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword,
            });

            // update key 
            await queryClient.invalidateQueries(["userInfo"]);
            console.log(" ✅ Cập nhật thành công mật khẩu ");
            onClose();
        } catch (err) {
            console.error("❌ Lỗi cập nhật:", err);
            setError(err?.response?.data?.message || "Đổi mật khẩu thất bại");
            alert("❌ Đổi mật khẩu thất bại");
        } finally {
            setSubmiting(false);
        }
    };

    return (
        <div className="fixed p-5 inset-0 z-50 flex">
            {/* Nền mờ */}
            <div
                className="absolute inset-0 bg-black/50 transition-opacity duration-500"
                onClick={onClose}
            ></div>

            {/* Sidebar form */}
            <div className="ml-auto w-full max-w-md h-full bg-white shadow-xl z-50 p-6 animate-slide-in rounded-2xl overflow-y-auto">
                <h3 className="text-lg font-semibold mb-6">
                    Cập nhật mật khẩu
                </h3>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    {/* Mật khẩu hiện tại  */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Mật khẩu hiện tại</label>
                        <input
                            type="text"
                            name="oldPassword"
                            onChange={handleChange}
                            value={formData.oldPassword}
                            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    {/* Mật khẩu mới  */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Mật khẩu mới </label>
                        <input
                            type="text"
                            name="newPassword"
                            onChange={handleChange}
                            value={formData.newPassword}
                            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Xác nhận mật khẩu mới </label>
                        <input
                            type="text"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}


                    {/* Nút hành động */}
                    <div className="flex items-center justify-center gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-10 py-3 text-sm rounded bg-gray-200 hover:bg-gray-300 hover:scale-105 transition duration-500"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            // className="px-10 py-3 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition duration-500"
                            className={`px-10 py-3 text-sm rounded text-white transition ${submit
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600"
                                }`}
                        >
                            {submit ? "Đang xử lý..." : "Cập nhật"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
