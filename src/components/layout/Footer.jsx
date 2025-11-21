import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-sm mt-10">
      <div className="max-w-screen-xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-600 dark:text-gray-400">
        {/* Cột 1: Logo & mô tả */}
        <div>
          <h2 className="text-lg font-semibold text-blue-600 mb-2">MyShop</h2>
          <p>Chúng tôi cung cấp sản phẩm chất lượng, giá cả hợp lý và dịch vụ tận tâm.</p>
        </div>

        {/* Cột 2: Điều hướng */}
        <div>
          <h3 className="font-semibold text-gray-700 dark:text-white mb-2">Điều hướng</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Trang chủ</a></li>
            <li><a href="#" className="hover:underline">Sản phẩm</a></li>
            <li><a href="#" className="hover:underline">Giỏ hàng</a></li>
            <li><a href="#" className="hover:underline">Liên hệ</a></li>
          </ul>
        </div>

        {/* Cột 3: Chính sách */}
        <div>
          <h3 className="font-semibold text-gray-700 dark:text-white mb-2">Chính sách</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Bảo mật</a></li>
            <li><a href="#" className="hover:underline">Điều khoản</a></li>
            <li><a href="#" className="hover:underline">Hoàn trả</a></li>
            <li><a href="#" className="hover:underline">Vận chuyển</a></li>
          </ul>
        </div>

        {/* Cột 4: Liên hệ */}
        <div>
          <h3 className="font-semibold text-gray-700 dark:text-white mb-2">Liên hệ</h3>
          <p>Email: support@myshop.vn</p>
          <p>Hotline: 1900 9999</p>
         <div className="flex gap-4 mt-3 text-xl">
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
    <FaFacebookF />
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-700">
    <FaTwitter />
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
    <FaInstagram />
  </a>
</div>
        </div>
      </div>

      {/* Dòng cuối cùng */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        © 2023 MyShop. All rights reserved.
      </div>
    </footer>
  );
}