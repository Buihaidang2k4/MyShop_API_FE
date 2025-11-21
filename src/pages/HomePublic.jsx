import { useState } from "react";
import Banner from "../components/Home/Banner";
import { useNavigate } from "react-router-dom";
import useAuth from "@/stores/useAuthStore";
import Carousel from "react-multi-carousel";
import ConfirmDialog from "@/utils/ConfirmDialog.jsx";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 6 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const SAMPLE_CATEGORIES = [
  { categoryId: "all", categoryName: "Tất cả" },
  { categoryId: "electronics", categoryName: "Điện tử" },
  { categoryId: "fashion", categoryName: "Thời trang" },
  { categoryId: "home", categoryName: "Nhà & Vườn" },
  { categoryId: "sports", categoryName: "Thể thao" },
  { categoryId: "books", categoryName: "Sách" },
  { categoryId: "food", categoryName: "Thực phẩm" },
];
const mockProducts = [
  {
    id: 1,
    productName: "Áo Thun Nam Cotton",
    description: "Áo thun chất liệu cotton thoáng mát, dễ chịu.",
    price: 199000,
    discount: 10,
    specialPrice: 179000,
    category: { categoryName: "Thời trang nam" },
    images: ["https://down-vn.img.susercontent.com/file/sg-11134201-7rdwy-lymv9ov6zsbzd2"]
  },
  {
    id: 2,
    productName: "Áo Khoác Nữ Dáng Dài",
    description: "Áo khoác nữ dáng dài, giữ ấm cực tốt.",
    price: 499000,
    discount: 15,
    specialPrice: 424000,
    category: { categoryName: "Thời trang nữ" },
    images: ["https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ln7afdh2wxrzef"]
  },
  {
    id: 3,
    productName: "Giày Thể Thao Nam",
    description: "Giày thể thao phong cách năng động, bền đẹp.",
    price: 599000,
    discount: 20,
    specialPrice: 479000,
    category: { categoryName: "Giày dép" },
    images: ["https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ln7afdh2wxrzef"]
  },
  {
    id: 4,
    productName: "Túi Xách Da Nữ",
    description: "Túi xách da cao cấp, phong cách thanh lịch.",
    price: 899000,
    discount: 25,
    specialPrice: 674000,
    category: { categoryName: "Phụ kiện" },
    images: ["https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lp3e8ifpl5p84d"]
  },
  {
    id: 5,
    productName: "Đồng Hồ Nam Dây Da",
    description: "Đồng hồ thời trang dây da sang trọng.",
    price: 1299000,
    discount: 30,
    specialPrice: 909000,
    category: { categoryName: "Phụ kiện" },
    images: ["https://down-vn.img.susercontent.com/file/sg-11134201-7r98o-lp3e7efpl5p84d"]
  },
  {
    id: 6,
    productName: "Balo Laptop Chống Nước",
    description: "Balo laptop 15 inch, chất liệu chống nước.",
    price: 699000,
    discount: 15,
    specialPrice: 594000,
    category: { categoryName: "Phụ kiện" },
    images: ["https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ln7aixh2wxrzef"]
  },
  {
    id: 7,
    productName: "Tai Nghe Bluetooth",
    description: "Tai nghe bluetooth âm thanh sống động, pin trâu.",
    price: 399000,
    discount: 10,
    specialPrice: 359000,
    category: { categoryName: "Điện tử" },
    images: ["https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lp3e9xfpl5p84d"]
  },
  {
    id: 8,
    productName: "Bình Giữ Nhiệt Inox 500ml",
    description: "Bình giữ nhiệt cao cấp, giữ nóng/lạnh lâu.",
    price: 299000,
    discount: 20,
    specialPrice: 239000,
    category: { categoryName: "Gia dụng" },
    images: ["https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ln7ajdh2wxrzef"]
  },
  {
    id: 9,
    productName: "Áo Sơ Mi Trắng Nam",
    description: "Áo sơ mi vải cotton mịn, dễ phối đồ.",
    price: 249000,
    discount: 5,
    specialPrice: 236000,
    category: { categoryName: "Thời trang nam" },
    images: ["https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ln7alzh2wxrzef"]
  },
  {
    id: 10,
    productName: "Váy Nữ Dáng Suông",
    description: "Váy nữ dáng suông trẻ trung, thoải mái.",
    price: 499000,
    discount: 15,
    specialPrice: 424000,
    category: { categoryName: "Thời trang nữ" },
    images: ["https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lp3e7ffpl5p84d"]
  }
];


export default function HomePublic() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const products = mockProducts;
  const [showDialog, setShowDialog] = useState(false);
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    console.log("Danh mục được chọn:", categoryId);
  };

  const hanldeClickBuyNow = () => {
    if (isLoggedIn) {
      navigate('home-private');
    } else {
      setShowDialog(true);
    }
  }

  const hanldeLogin = () => {
    setShowDialog(false);
    navigate('/login');
  }

  const hanldeRegister = () => {
    setShowDialog(false);
    navigate('/register');
  }

  const handleCloseDialog = () => {
    setShowDialog(false);
  };
  return (
    <>
      <Banner />

      {/* Category */}
      <div className="relative w-full bg-gradient-to-r from-sky-900 to-sky-700 py-5 shadow-inner">
        <div className="flex flex-wrap justify-center gap-4 px-4">
          {SAMPLE_CATEGORIES.map((category) => (
            <button
              key={category.categoryId}
              onClick={() => handleCategoryChange(category.categoryId)}
              className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 
          ${selectedCategory === category.categoryId
                  ? "bg-white text-sky-700 shadow-lg scale-105"
                  : "bg-sky-800/40 text-white hover:bg-sky-600/60 hover:scale-105"
                }`}
            >
              {selectedCategory === category.categoryId && (
                <span className="absolute inset-x-0 bottom-0 h-[3px] bg-yellow-400 rounded-full"></span>
              )}
              {category.categoryName}
            </button>
          ))}
        </div>
      </div>


      <div className="p-10 ">
        <h2 className="font-bold text-2xl mb-6 text-sky-950">
          Danh sách sản phẩm
        </h2>

        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={2500}
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {products.map((p) => (
            <div
              key={p.id}
              className="h-[400px] flex  flex-col justify-between overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden 
                       hover:shadow-2xl transition duration-300 mx-2 group relative"
            >
              {/* Tag giảm giá */}
              {p.discount > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
                  -{p.discount}%
                </span>
              )}

              {/* Ảnh */}
              <div className="h-48 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.productName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Nội dung */}
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition truncate">
                  {p.productName}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {p.description}
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-red-600 font-bold">
                    {p.specialPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                  {p.discount > 0 && (
                    <span className="text-gray-400 line-through text-sm">
                      {p.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  )}
                </div>

                <span className="text-xs text-gray-400">
                  Danh mục: {p.category.categoryName}
                </span>

                <button
                  onClick={hanldeClickBuyNow}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Mua ngay
                </button>
              </div>
            </div>
          ))}
        </Carousel>

        {showDialog && (
          <ConfirmDialog
            isOpen={showDialog}
            onClose={handleCloseDialog} // khi bấm Hủy
            onConfirm={hanldeLogin}     // khi bấm Xác nhận
            title="Bạn chưa đăng nhập"
            message="Bạn cần đăng nhập để tiếp tục mua hàng. Bạn có muốn đi tới trang đăng nhập không?"
            confirmText="Đăng nhập"
            cancelText="Hủy"
          />
        )}
      </div>
    </>
  );
}
