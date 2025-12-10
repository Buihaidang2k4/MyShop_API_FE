import { useEffect, useRef, useState } from "react";
import logo from "../../assets/image/mylogo.png";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "@/stores/useAuthStore.jsx";
import useLogout from "../../hooks/auth/useLogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmDialog from "@/utils/ConfirmDialog.jsx";
import { notify } from "../../utils/notify";

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuthStore();
  const { logout } = useLogout();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const menuRef = useRef(null);

  // Click avatar
  const handleProfileClick = () => {
    if (isLoggedIn) setShowProfileMenu(!showProfileMenu);
    else setShowDialog(true);
  };

  const handleCartClick = () => {
    if (isLoggedIn) navigate("/shop-cart");
    else setShowDialog(true);
  }

  const handleLogoClick = () => {
    if (isLoggedIn) navigate("/home-private");
    else {
      navigate("/");
    };
  }

  // close profile khi click bên ngoài
  useEffect(() => {
    const hanldeClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setShowProfileMenu(false);
    };
    document.addEventListener("mousedown", hanldeClickOutside);
    return () => document.removeEventListener("mousedown", hanldeClickOutside);
  }, [])

  // func search 
  const handleSearch = (query) => {
    console.log("Đang tìm:", query);
    // Thực hiện logic tìm kiếm ở đây
  };

  return (
    <header className="w-full shadow-md bg-white sticky top-0 z-49" >
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleLogoClick}
        >
          <img src={logo} alt="MyShop Logo" className="h-12 w-auto rounded-xl" />
          <h1 className="text-xl font-extrabold hidden sm:block text-sky-800">
            MYSHOPAPI
          </h1>
        </div>

        {/* Search bar */}
        <div className="flex flex-1 max-w-lg items-center">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e.target.value);
              }
            }}
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Cart + Profile */}
        <div className="flex items-center gap-7 relative">
          {/* Cart */}
          <div
            className="relative cursor-pointer hover:text-sky-600 transition hover:scale-105"
            onClick={handleCartClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 25"
              fill="currentColor"
              className="h-7 w-7 text-black"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">3</span>
          </div>

          {/* Profile */}
          <div className="relative" ref={menuRef}>
            <div
              className="h-8 w-30 text-white rounded-full bg-blue-500 flex items-center justify-center cursor-pointer hover:ring-2  transition hover:scale-105"
              onClick={handleProfileClick}
            >
              <FontAwesomeIcon icon={['fas', 'user']} />
            </div>

            {/* Confirm dialog profile*/}
            <ConfirmDialog
              isOpen={showDialog}
              onClose={() => setShowDialog(false)}
              onConfirm={() => navigate("/login")}
              title="Chưa đăng nhập"
              message="Bạn cần đăng nhập để truy cập profile. Bạn có muốn đi tới trang đăng nhập không?"
              confirmText="Đăng nhập"
              cancelText="Hủy"
            />

            {/* Dropdown menu khi login */}
            {showProfileMenu && isLoggedIn && (
              <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-xl border border-gray-100 text-gray-700 z-50 animate-fadeIn">
                {/* Header user info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="font-semibold text-gray-900 truncate">{user?.email || "Người dùng"}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Thành viên MYSHOP</p>
                </div>

                {/* Menu items */}
                <div className="py-1">
                  <Link
                    to="/manager"
                    className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <i className="fa-solid fa-gear w-5 text-gray-500" />
                    Quản lý tài khoản
                  </Link>

                  <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 transition"
                  >
                    <i className="fa-solid fa-right-from-bracket w-5 text-gray-500" />
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
