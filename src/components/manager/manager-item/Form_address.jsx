import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useUserInfor from "@/hooks/user/useUserInfor";
import addressService from "@/services/addressService";

export default function Form_address({ onClose }) {
    const queryClient = useQueryClient();
    const { data: user, isLoading } = useUserInfor();

    const [formData, setFormData] = useState({
        street: "",
        ward: "true",
        district: "",
        province: "",
        postalCode: "",
        additionalInfo: "",
    });

    // Load dữ liệu user vào form
    useEffect(() => {
        if (!user) return;

        const address = user.userProfile.addressResponse;

        setFormData({
            street: address.street || "",
            ward: address.ward || "",
            district: address.district || "",
            province: address.province || "",
            postalCode: address.postalCode || "",
            additionalInfo: address.additionalInfo || "",
        });
    }, [user]);

    // Loading
    if (isLoading || !user.userProfile) return <div>Loading...</div>;

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addressService.updateAddress(user.userProfile.addressResponse.addressId, formData);

            // update key 
            await queryClient.invalidateQueries(["userInfo"]);
            console.log(" ✅ Cập nhật thành công địa Chỉ ");
            onClose();
        } catch (err) {
            console.error("Lỗi cập nhật:", err);
            alert("Cập nhật thất bại");
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
                    Cập nhật địa chỉ
                </h3>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

                    {/* Đường */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Số nhà / Đường</label>
                        <input
                            type="text"
                            name="street"
                            onChange={handleChange}
                            value={formData.street}
                            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    {/* Phường */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Phường / Xã</label>
                        <input
                            type="text"
                            name="ward"
                            onChange={handleChange}
                            value={formData.ward}
                            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    {/* Quận */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Quận / Huyện</label>
                        <input
                            type="text"
                            name="district"
                            onChange={handleChange}
                            value={formData.district}
                            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    {/* Tỉnh */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Tỉnh / Thành phố</label>
                        <input
                            type="text"
                            name="province"
                            onChange={handleChange}
                            value={formData.province}
                            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    {/* Mã bưu chính */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Mã bưu chính</label>
                        <input
                            type="text"
                            name="postalCode"
                            onChange={handleChange}
                            value={formData.postalCode}
                            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    {/* Thông tin thêm */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Thông tin bổ sung</label>
                        <textarea
                            name="additionalInfo"
                            onChange={handleChange}
                            value={formData.additionalInfo}
                            rows={3}
                            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        ></textarea>
                    </div>

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
                            className="px-10 py-3 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition duration-500"
                        >
                            Cập nhật
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
