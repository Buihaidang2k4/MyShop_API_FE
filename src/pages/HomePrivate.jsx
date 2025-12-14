import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFire, faBolt, faTruckFast, faShieldHalved,
    faHeadset, faGift, faChevronRight,
    faEnvelope, faStar, faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";

import bannerImg from "@/assets/image/banners/banner.png";
import useProducts from "../hooks/product/useProducts";
import Loading from "../utils/Loading";
import Error from "../utils/Error";
import Category from "../components/layout/Category";
import ProductList from "../components/product-list/ProductList";
import { formatCurrency } from "../components/product-details/sample/FomartProduct";

export default function HomePrivate() {
    const [page, setPage] = useState(0);

    // Fetch Products
    const { data, isLoading, isError, isFetching } = useProducts(page, 15);
    const products = data?.data?.data?.content || [];
    const totalPages = data?.data?.data?.totalPages || 1;

    // Flash Sale Timer Logic
    const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 15, seconds: 0 });
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (isLoading) return <Loading />;
    if (isError) return <Error />;


    const HeroSection = () => (
        <div className="relative w-full p-5 bg-white">
            <div className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl group h-[350px] md:h-[450px]">
                <img
                    src={bannerImg}
                    alt="banner"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 text-white max-w-lg">
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block">New Arrival</span>
                    <h2 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-4 leading-tight">
                        Khám phá <br /> Công nghệ mới
                    </h2>
                    <p className="text-lg opacity-90 mb-6 font-light">
                        Trải nghiệm đỉnh cao với bộ sưu tập mới nhất. Giảm giá 30% cho thành viên mới.
                    </p>
                    <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all transform hover:-translate-y-1 flex items-center gap-2">
                        Mua ngay <FontAwesomeIcon icon={faChevronRight} size="xs" />
                    </button>
                </div>
            </div>
        </div>
    );

    const ServiceBar = () => (
        <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                {[
                    { icon: faTruckFast, title: "Miễn phí vận chuyển", sub: "Đơn từ 500k", color: "text-blue-600" },
                    { icon: faShieldHalved, title: "Bảo hành chính hãng", sub: "100% Auth", color: "text-green-600" },
                    { icon: faHeadset, title: "Hỗ trợ 24/7", sub: "Tư vấn tận tâm", color: "text-purple-600" },
                    { icon: faGift, title: "Quà tặng thành viên", sub: "Voucher mỗi tuần", color: "text-red-600" }
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-default">
                        <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg ${item.color}`}>
                            <FontAwesomeIcon icon={item.icon} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">{item.title}</h3>
                            <p className="text-xs text-gray-500">{item.sub}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const InspirationSection = () => (
        <div className="py-16 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <span className="text-blue-600 font-bold tracking-wider uppercase text-xs mb-2 block">Lifestyle</span>
                        <h2 className="text-3xl font-extrabold text-gray-900">Không gian & Cảm hứng</h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-xl">
                            Khám phá các góc setup cực chất từ cộng đồng. Tìm kiếm phong cách phù hợp với cá tính của bạn.
                        </p>
                    </div>
                    <button className="group flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full font-semibold transition-all">
                        Xem tất cả bộ sưu tập
                        <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform text-sm" />
                    </button>
                </div>

                {/* Grid Layout - Masonry Style giả lập */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-auto md:h-[500px]">

                    {/* Card Lớn - GAMING */}
                    <div className="lg:col-span-2 row-span-2 relative group overflow-hidden rounded-2xl cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80"
                            alt="Gaming Setup"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded w-fit mb-2">HOT TREND</span>
                            <h3 className="text-2xl font-bold text-white mb-1">Góc Gaming RGB Đỉnh Cao</h3>
                            <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                Trọn bộ PC, Màn hình, Bàn phím cơ và đèn LED trang trí.
                            </p>
                        </div>
                    </div>

                    {/* Card Nhỏ 1 - WORKSPACE */}
                    <div className="relative group overflow-hidden rounded-2xl cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&q=80"
                            alt="Office Setup"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col justify-end p-4">
                            <h3 className="text-lg font-bold text-white">Minimalist Workspace</h3>
                            <span className="text-xs text-gray-200">Cho người yêu sự tối giản</span>
                        </div>
                    </div>

                    {/* Card Nhỏ 2 - AUDIO */}
                    <div className="relative group overflow-hidden rounded-2xl cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80"
                            alt="Audio Setup"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col justify-end p-4">
                            <h3 className="text-lg font-bold text-white">Audiophile Corner</h3>
                            <span className="text-xs text-gray-200">Loa, Tai nghe &amp; Amply</span>
                        </div>
                    </div>

                    {/* Card Ngang - TRAVEL (Chiếm 2 cột nhỏ) */}
                    <div className="lg:col-span-2 relative group overflow-hidden rounded-2xl cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1515965885361-f1e0095517ea?w=800&q=80"
                            alt="Tech Travel"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-6">
                            <h3 className="text-xl font-bold text-white mb-2">Công nghệ cho những chuyến đi</h3>
                            <p className="text-gray-300 text-sm max-w-xs mb-4">
                                Camera hành trình, Pin dự phòng và những phụ kiện không thể thiếu.
                            </p>
                            <span className="text-white text-xs font-bold underline decoration-2 underline-offset-4 hover:text-blue-400 transition">Khám phá ngay</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const AppSection = () => (
        <div className="bg-gray-900 text-white py-12 mt-10 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between relative z-10">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <span className="text-orange-400 font-bold tracking-wider uppercase text-sm">Trải nghiệm tốt hơn</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Tải ứng dụng ngay hôm nay</h2>
                    <p className="text-gray-400 mb-8 max-w-md">
                        Mua sắm dễ dàng, nhận thông báo khuyến mãi độc quyền và theo dõi đơn hàng mọi lúc mọi nơi.
                    </p>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-3 bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                            <FontAwesomeIcon icon={faApple} className="text-2xl" />
                            <div className="text-left">
                                <div className="text-[10px] uppercase font-bold">Download on the</div>
                                <div className="text-sm font-bold leading-none">App Store</div>
                            </div>
                        </button>
                        <button className="flex items-center gap-3 bg-transparent border border-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                            <FontAwesomeIcon icon={faGooglePlay} className="text-2xl text-green-500" />
                            <div className="text-left">
                                <div className="text-[10px] uppercase font-bold">Get it on</div>
                                <div className="text-sm font-bold leading-none">Google Play</div>
                            </div>
                        </button>
                    </div>
                </div>
                {/* Hình minh họa điện thoại (Placeholder) */}
                <div className="md:w-1/2 flex justify-center md:justify-end">
                    <div className="w-64 h-96 bg-gray-800 rounded-[2.5rem] border-8 border-gray-700 shadow-2xl flex items-center justify-center relative rotate-6 hover:rotate-0 transition-all duration-500">
                        <div className="text-gray-600 font-bold">App Preview UI</div>
                        {/* Notch */}
                        <div className="absolute top-0 w-32 h-6 bg-gray-700 rounded-b-xl"></div>
                    </div>
                </div>
            </div>
            {/* Background Shape */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-800 skew-x-12 translate-x-20 opacity-50"></div>
        </div>
    );

    const AboutShopSection = () => (
        <div className="py-12 bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
                <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase">Về Chúng Tôi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm text-gray-600 leading-relaxed">
                    <div>
                        <p className="mb-4">
                            <strong>MyStore</strong> là điểm đến hàng đầu cho các tín đồ công nghệ và thời trang. Chúng tôi cam kết mang đến những sản phẩm chính hãng 100% với mức giá cạnh tranh nhất thị trường.
                        </p>
                        <p>
                            Với sứ mệnh "Nâng tầm trải nghiệm mua sắm", chúng tôi không ngừng nỗ lực cải thiện dịch vụ, từ khâu tư vấn, đóng gói đến giao hàng, đảm bảo sự hài lòng tuyệt đối cho khách hàng.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 mb-2">Tại sao chọn chúng tôi?</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center justify-center md:justify-start gap-2">
                                <FontAwesomeIcon icon={faStar} className="text-yellow-400" /> Uy tín được khẳng định bởi hơn 1 triệu khách hàng.
                            </li>
                            <li className="flex items-center justify-center md:justify-start gap-2">
                                <FontAwesomeIcon icon={faShieldHalved} className="text-blue-500" /> Chính sách đổi trả minh bạch, rõ ràng.
                            </li>
                            <li className="flex items-center justify-center md:justify-start gap-2">
                                <FontAwesomeIcon icon={faTruckFast} className="text-green-500" /> Hệ thống kho bãi rộng khắp, giao hàng thần tốc.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            <HeroSection />
            <ServiceBar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">

                {/* 1. Category */}
                <section>
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-800">Danh Mục Sản Phẩm</h3>
                        <div className="w-16 h-1 bg-blue-600 mx-auto mt-2 rounded-full"></div>
                    </div>
                    <Category />
                </section>

                {/* 2. Flash Sale Section */}
                <section className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden mt-10">
                    {/* Header Flash Sale */}
                    <div className="px-5 py-4 flex flex-col md:flex-row justify-between items-center gap-4 bg-white border-b border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <h2 className="text-2xl font-extrabold text-red-600 italic tracking-tighter uppercase">
                                    <FontAwesomeIcon icon={faBolt} className="mr-2 animate-bounce" />
                                    Flash Sale
                                </h2>
                            </div>

                            {/* Countdown Timer - Style Đồng hồ số */}
                            <div className="flex items-center gap-1 font-bold text-white">
                                <span className="bg-gray-900 rounded px-2 py-1 text-sm">{String(timeLeft.hours).padStart(2, '0')}</span>
                                <span className="text-gray-900 text-lg">:</span>
                                <span className="bg-gray-900 rounded px-2 py-1 text-sm">{String(timeLeft.minutes).padStart(2, '0')}</span>
                                <span className="text-gray-900 text-lg">:</span>
                                <span className="bg-gray-900 rounded px-2 py-1 text-sm">{String(timeLeft.seconds).padStart(2, '0')}</span>
                            </div>
                        </div>

                        <a href="#" className="text-sm font-semibold text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors">
                            Xem tất cả <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                        </a>
                    </div>

                    {/* Danh sách sản phẩm */}
                    <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {products.slice(0, 4).map((prod, index) => {
                            // --- CẤU HÌNH DATA GIẢ LẬP ĐỂ DEMO (Nếu API chưa có) ---
                            // Danh sách ảnh mẫu đẹp (Công nghệ, Đồng hồ, Giày...)
                            const demoImages = [
                                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", // Tai nghe
                                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", // Đồng hồ
                                "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80", // Camera
                                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", // Giày
                            ];

                            // Lấy ảnh từ API, nếu không có thì lấy ảnh demo theo index
                            const displayImage = prod.image || demoImages[index % demoImages.length];
                            const fakeSold = 15 + (index * 12); // Giả lập số lượng bán
                            const percentSold = Math.min(90, 20 + (index * 20)); // Giả lập % thanh progress
                            // --------------------------------------------------------

                            return (
                                <div
                                    key={prod.productId}
                                    className="group relative flex flex-col bg-white border border-transparent hover:border-red-500 hover:shadow-lg rounded-lg p-3 transition-all duration-300 cursor-pointer"
                                >
                                    {/* Badge Giảm giá */}
                                    <div className="absolute top-0 right-0 z-10">
                                        <div className="bg-yellow-400 text-red-700 text-xs font-extrabold px-2 py-1 rounded-bl-lg rounded-tr-md shadow-sm">
                                            -45%
                                        </div>
                                    </div>

                                    {/* Ảnh sản phẩm (Vuông) */}
                                    <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-md bg-gray-50">
                                        <img
                                            src={displayImage}
                                            alt={prod.productName}
                                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Thông tin */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
                                                {prod.productName || "Sản phẩm mẫu demo tên dài để test giao diện"}
                                            </h3>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-lg font-bold text-red-600">
                                                    {formatCurrency ? formatCurrency(prod.price) : prod.price.toLocaleString() + "đ"}
                                                </span>
                                                <span className="text-xs text-gray-400 line-through">
                                                    {formatCurrency ? formatCurrency(prod.price * 1.45) : (prod.price * 1.45).toLocaleString() + "đ"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Thanh Progress "Đã bán" (Style Shopee) */}
                                        <div className="mt-3 relative w-full h-4 bg-red-100 rounded-full overflow-hidden">
                                            {/* Thanh màu đỏ bên trong */}
                                            <div
                                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full"
                                                style={{ width: `${percentSold}%` }}
                                            ></div>

                                            {/* Icon lửa trang trí */}
                                            {percentSold > 50 && (
                                                <div className="absolute top-0 left-1 h-full flex items-center text-[10px] text-white animate-pulse">
                                                    <FontAwesomeIcon icon={faFire} />
                                                </div>
                                            )}

                                            {/* Text nằm đè lên trên */}
                                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                                <span className="text-[10px] font-bold text-white uppercase tracking-wide drop-shadow-sm">
                                                    Đã bán {fakeSold}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 3. Banner Quảng cáo giữa trang */}
                <section className="relative rounded-2xl overflow-hidden h-64 flex items-center bg-gradient-to-r from-blue-800 to-indigo-900 shadow-xl">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="relative z-10 px-8 md:px-16 w-full md:w-2/3">
                        <span className="text-blue-300 font-bold tracking-widest text-sm mb-2 block">SUMMER COLLECTION</span>
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Nâng cấp phong cách <br /> Phụ kiện thời thượng</h3>
                        <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 hover:shadow-lg transition">
                            Mua Ngay
                        </button>
                    </div>
                    {/* Hình trang trí */}
                    <div className="absolute right-[-50px] bottom-[-50px] w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay blur-3xl"></div>
                </section>

                {/* 4. MAIN PRODUCT LIST */}
                <section>
                    <div className="flex items-center gap-3 mb-6 border-l-4 border-orange-500 pl-4">
                        <h2 className="text-2xl font-bold text-gray-900">Gợi ý hôm nay</h2>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-h-[400px] relative">
                        {isFetching && <div className="absolute inset-0 bg-white/50 z-20 flex justify-center items-center"><Loading /></div>}
                        <ProductList
                            products={products}
                            totalPages={totalPages}
                            page={page}
                            setPage={setPage}
                        />
                    </div>
                </section>
            </div>

            <InspirationSection />
            <AppSection />
            <AboutShopSection />
            <div className="bg-blue-600 py-10">
                <div className="max-w-3xl mx-auto px-4 text-center text-white">
                    <FontAwesomeIcon icon={faEnvelope} className="text-4xl mb-4 opacity-80" />
                    <h2 className="text-2xl font-bold mb-2">Đăng ký nhận bản tin</h2>
                    <p className="text-blue-100 mb-6">Nhận mã giảm giá 50% cho đơn hàng đầu tiên khi đăng ký ngay hôm nay.</p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <input
                            type="email"
                            placeholder="Địa chỉ email của bạn..."
                            className="px-5 py-3 rounded-lg w-full sm:w-96 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition">
                            Đăng ký
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}