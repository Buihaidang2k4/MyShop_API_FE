import logo from "@/assets/image/mylogo.png";
import useRegister from "@/hooks/auth/useRegister";
import { Link } from "react-router-dom";
export default function Register() {
    const {
        email, setEmail,
        username, setUsername,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        error, handleRegister,
        loading, dialog,
    } = useRegister();

    return (
        <>
            <div className="min-h-screen flex">
                {/* Form bên trái */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 bg-gray-900">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-3xl font-bold text-blue-600 mb-6">MYSHOPAPI</h1>
                        <h2 className="text-2xl font-semibold mb-4 text-white">Tạo tài khoản mới</h2>

                        <form className="space-y-4" onSubmit={handleRegister} autoComplete="on">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    className="text-white mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Username */}
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-white">
                                    Tên người dùng
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    autoComplete="username"
                                    className="text-white mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-white">
                                    Mật khẩu
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                    className="text-white mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                                    Nhập lại mật khẩu
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                    className="text-white mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="text-red-500 text-sm mt-2">
                                    ❌ <span className="font-medium">Lỗi:</span> {error}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-2 rounded-md transition font-semibold ${loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 text-white"
                                    }`}
                            >
                                {loading ? "Đang xử lý..." : "Đăng ký"}
                            </button>

                            {/* Điều hướng quay về đăng nhập */}
                            <div className="flex items-center justify-between">
                                <Link to="/login" className="text-sm text-blue-400 hover:underline">
                                    <span className="text-white">Đã có tài khoản?</span>  Đăng nhập
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Hình ảnh bên phải */}
                <div className="hidden md:block md:w-1/2 bg-gray-100">
                    <div
                        className="h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${logo})` }}
                    ></div>
                </div>
            </div>
            {dialog.show && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm border-l-4 border-l-blue-600">
                        <h2 className="text-lg font-semibold mb-2 text-green-700">Thành công</h2>
                        <p className="text-gray-700 mb-4">{dialog.message}</p>
                        <div className="flex justify-end">
                            <Link
                                to="/login"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Đăng nhập ngay
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
}