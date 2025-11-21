import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Manager_form_information from "./manager-item/Manager_form_Information";
import useUserInfor from "@/hooks/user/useUserInfor";

export default function UserInfo() {
  const [showFormUserInfomation, setShowFormUserInfomation] = useState(false);
  // const [showFormAddress, setShowFormAddress] = useState(false);
  // const [showFormPassword, setShowFormPassword] = useState(false);

  const { userInfo, loading } = useUserInfor();


  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="flex flex-col gap-6">
      {/* Thông tin cá nhân */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        {/* Tiêu đề và nút cập nhật */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Thông tin tài khoản</h2>
          <button
            onClick={() => setShowFormUserInfomation(true)}
            className="flex items-center gap-1 text-red-500 text-sm font-medium hover:underline hover:text-red-600 transition cursor-pointer">
            <FontAwesomeIcon icon={faPenToSquare} className="text-xs" />
            <span>Cập nhật</span>
          </button>
        </div>

        {/*  Nội dùng */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-500">Họ và tên:</span>
            <span className="font-semibold">{userInfo.userProfile.username || "Default User"}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-500">Số điện thoại:</span>
            <span className="font-semibold">{userInfo.userProfile.mobileNumber != undefined ? userInfo.userProfile.mobileNumber : "-"}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-500">Giới tính:</span>
            <span className="font-semibold">{userInfo.userProfile.gender != undefined ? (userInfo.userProfile.gender == 0 ? "Nam" : "Nữ") : "-"}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-500">Email:</span>
            <span className="font-semibold">{userInfo.email || "-"}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-500">Ngày sinh:</span>
            <span className="font-semibold">{userInfo.userProfile.birthDate != undefined ? userInfo.userProfile.birthDate : "-"}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-500">Địa chỉ mặc định:</span>
            <span className="font-semibold">-</span>
          </div>
        </div>

        {showFormUserInfomation && <Manager_form_information onClose={() => setShowFormUserInfomation(false)} />}
      </section>

      {/* Địa chỉ */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Địa chỉ</h2>
          <button className="flex items-center gap-1 text-red-500 text-sm font-medium hover:underline hover:text-red-600 transition cursor-pointer">
            <FontAwesomeIcon icon={faPenToSquare} className="text-xs" />
            <span>Thêm địa chỉ</span>
          </button>
        </div>
      </section>

      {/* Mật khẩu tài khoản liên kết */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex gap-5">
          <div className="">
            <h2 className="text-lg font-semibold text-gray-800">Mật khẩu</h2>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Tài khoản liên kết </h2>
          </div>
        </div>
      </section>
    </div >
  )
}
