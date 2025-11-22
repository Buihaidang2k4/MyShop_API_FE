import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useUserInfor from "@/hooks/user/useUserInfor";
import profileService from "@/services/profileServce";

export default function Manager_form_information({ onClose }) {
  const queryClient = useQueryClient();
  const { data: userInfo, isLoading } = useUserInfor();

  const [formData, setFormData] = useState({
    username: "",
    gender: "true",
    birthDate: "",
    mobileNumber: "",
  });

  // Load dữ liệu user vào form
  useEffect(() => {
    if (!userInfo) return;

    setFormData({
      username: userInfo.userProfile.username || "",
      gender: String(userInfo.userProfile.gender ?? true),
      birthDate: userInfo.userProfile.birthDate || "",
      mobileNumber: userInfo.userProfile.mobileNumber || "",
    });
  }, [userInfo]);

  // Loading
  if (isLoading || !userInfo.userProfile) return <div>Loading...</div>;

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "mobileNumber") {
      newValue = value.replace(/\D/g, "");

      // Format theo nhóm 3-3-4 (ví dụ: 012 345 6789)
      if (newValue.length > 3 && newValue.length <= 6) {
        newValue = newValue.replace(/(\d{3})(\d+)/, "$1 $2");
      } else if (newValue.length > 6) {
        newValue = newValue.replace(/(\d{3})(\d{3})(\d+)/, "$1 $2 $3");
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await profileService.createOrUpdateProfile(userInfo.id, {
        username: formData.username,
        gender: formData.gender === "true",
        birthDate: formData.birthDate,
        mobileNumber: formData.mobileNumber,
      });

      // update key 
      await queryClient.invalidateQueries(["userInfo"]);
      console.log("Cập nhật thành công");
      onClose();
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      alert("Cập nhật thất bại");
    }
  };

  return (
    <div className="fixed p-5 inset-0 z-50 flex">
      {/* Nền mờ */}
      <div className="absolute inset-0 bg-black/50 transition-opacity duration-500" onClick={onClose}></div>

      {/* Sidebar form */}
      <div className="ml-auto w-full max-w-md h-full bg-white shadow-xl z-50 p-6 animate-slide-in rounded-2xl overflow-y-auto">
        <h3 className="text-lg font-semibold mb-6">Cập nhật thông tin cá nhân</h3>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

          {/* Họ và tên */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Họ và tên</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={formData.username}
              className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Giới tính */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Giới tính</label>
            <select
              name="gender"
              onChange={handleChange}
              value={formData.gender}
              className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
            >
              <option value="">Chọn giới tính</option>
              <option value="false">Nam</option>
              <option value="true">Nữ</option>
            </select>
          </div>

          {/* Ngày sinh */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Ngày sinh</label>
            <input
              type="date"
              name="birthDate"
              onChange={handleChange}
              value={formData.birthDate}
              min="1900-01-01"
              max="2100-12-31"
              className="border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Số điện thoại */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
            <input
              type="text"
              name="mobileNumber"
              onChange={handleChange}
              value={formData.mobileNumber}
              className="border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 opacity-60">Email</label>
            <input
              type="email"
              value={userInfo.email}
              disabled
              className="border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 opacity-60"
            />
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
