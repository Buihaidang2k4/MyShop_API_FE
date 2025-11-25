import banner from "../../assets/image/banners/banner.png";

export default function Banner() {
  return (
    <div className="relative w-full p-5">
      <div className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-xl group">
        
        <img 
          src={banner} 
          alt="banner"
          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>

        {/* Text */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 text-white">
          <h2 className="text-4xl font-extrabold drop-shadow-lg">
            Khám phá sản phẩm mới
          </h2>
          <p className="mt-3 text-lg opacity-90">
            Ưu đãi hấp dẫn chỉ có ở đây
          </p>
        </div>
      </div>
    </div>
  );
}
