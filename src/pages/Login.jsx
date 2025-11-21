import logo from '../assets/image/mylogo.png';
import GoogleLoginButton from '../components/Login/GoogleLoginButton';
import useLogin from '../hooks/auth/useLogin';
import { Link } from 'react-router-dom';

export default function Login() {
    const { email, setEmail, password, setPassword, error,loading, handleLogin } = useLogin();


    return (
        <div className="min-h-screen flex">
            {/* Bên trái: Form đăng nhập */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 bg-gray-900  ">
                <div className="max-w-md mx-auto">
                    {/* Logo */}
                    <h1 className="text-3xl font-bold text-blue-600 mb-6">MYSHOPAPI</h1>

                    {/* Tiêu đề */}
                    <h2 className="text-2xl font-semibold mb-2 text-white">Sign in to your account</h2>

                    {/* Form */}
                    <form className="space-y-4" onSubmit={handleLogin} autoComplete="on">
                        <div>
                            <label className="block text-sm font-medium text-white ">Email address</label>
                            <input type="email" value={email} name='email' onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                className="text-white mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white">Password</label>
                            <input type="password" value={password} name='password' onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                className="text-white mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        {error && <div className="text-red-500 text-sm">Lỗi: {error}</div>}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-sm text-white">
                                <input type="checkbox" className="mr-2" />
                                Remember me
                            </label>
                            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
                        </div>
                        <button type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        >Sign in</button>
                    </form>

                    {/* Hoặc đăng nhập bằng */}
                    <div className="mt-6 text-center text-sm text-white">or continue with</div>
                    <div className="mt-4 rounded-full cursor-pointer">
                        <GoogleLoginButton />
                    </div>

                    {/* Đăng ký */}
                    <div className="mt-4 rounded-full cursor-pointer flex items-center justify-center gap-2">
                        <Link to="/register" className="text-sm text-white hover:underline">
                            Don't have an account? <span className='text-blue-400'>Register here.</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bên phải: Hình ảnh hoặc workspace */}
            <div className="hidden md:block md:w-1/2 bg-gray-100">
                {/* Bạn có thể đặt hình ảnh hoặc component tại đây */}
                <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${logo})` }}
                ></div>
            </div>
        </div>
    );
}