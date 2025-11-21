import { useState, useEffect } from "react";
import useUserInfor from "@/hooks/user/useUserInfor";


export default function Manager_form_information({ onClose }) {
  const { userInfo, loading } = useUserInfor();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    gender: "",
    birthDate: "",
    mobileNumber: "",
  });


  useEffect(() => {
    if (userInfo && userInfo.userProfile) {
      setFormData({
        username: userInfo.userProfile.username || "",
        gender: userInfo.userProfile.gender || "",
        birthDate: userInfo.userProfile.birthDate || "",
        mobileNumber: userInfo.userProfile.mobileNumber || "",
        email: userInfo.email || "",
      });
    }
  }, [userInfo]);

  // ========== Loading Userinfor ===============
  if (loading || !userInfo.userProfile) return <div>Loading...</div>

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Thông tin cập nhật ", formData);
    // api
    

  };


  return (
    <div className="fixed p-5 inset-0 z-50 flex">
      {/* Nền mờ */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-500"
        onClick={onClose}
      ></div>

      {/* Sidebar form bên phải */}
      <div className="ml-auto w-full max-w-md h-full bg-white shadow-xl z-50 p-6 animate-slide-in rounded-2xl overflow-y-auto">
        <h3 className="text-lg font-semibold mb-6">Cập nhật thông tin cá nhân</h3>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Họ và tên */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Họ và tên</label>
            <input type="text"
              name="username"
              onChange={handleChange}
              value={formData.username}
              className=" border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Giới tính */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Giới tính</label>
            <select
              name="gender"
              onChange={handleChange}
              value={formData.gender}
              className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer hover:scale-101">
              <option value="">Chọn giới tính</option>
              <option value="false">Nam</option>
              <option value="true">Nữ</option>
            </select>
          </div>

          {/* Ngày sinh */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700  opacity-60">Ngày sinh</label>
            <input type="date"
              name="birthDate"
              onChange={handleChange}
              value={formData.birthDate}
              min="1900-01-01"
              max="2100-12-31"
              className="border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 hover:scale-101 pointer-events-none opacity-60 " disabled />
          </div>

          {/* Số điện thoại */}
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm font-medium text-gray-700  opacity-60">Số điện thoại</label>
            <input type="text"
              name="mobileNumber"
              disabled
              onChange={handleChange}
              value={formData.mobileNumber}
              className="border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer opacity-60" />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700  opacity-60">Email</label>
            <input disabled type="email"
              value={userInfo.email}
              className="border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 opacity-60" />
          </div>

          {/* Nút hành động */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-10 py-3 text-sm rounded bg-gray-200 hover:bg-gray-300 hover:scale-105 transition duration-500"
            >
              Thiết lập lại
            </button>
            <button
              type="submit"
              className="px-10 py-3 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition duration-500"
            >
              Cập nhật thông tin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}