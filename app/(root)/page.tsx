"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  const banners = [
    {
      image: "/Banner.png",
      title: "Bộ Sưu Tập Mới 2025",
      description: "Khám phá phong cách thời trang mới nhất",
      link: "/",
    },
    {
      image: "/banner_new_arrival-01.jpg",
      title: "Giảm Giá Đến 50%",
      description: "Ưu đãi hấp dẫn cho mùa này",
      link: "/",
    },
    {
      image: "/banner_new_arrival-02.jpg",
      title: "Thời Trang Cao Cấp",
      description: "Phong cách riêng của bạn",
      link: "/",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.slice(0, 8)); // Lấy 8 sản phẩm đầu tiên
      } catch (error) {
        console.log("[products_GET]", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="min-h-screen">
      <section className="relative w-full h-[600px] max-md:h-[400px] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-all duration-500 ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            }`}
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-5xl max-md:text-3xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {banner.title}
                </h1>
                <p className="text-xl max-md:text-lg mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                  {banner.description}
                </p>
                <Link
                  href={banner.link}
                  className="inline-block bg-red-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-600 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
                >
                  Mua Ngay
                </Link>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="py-16 px-10 max-md:px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Danh Mục Sản Phẩm
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Áo", image: "/Áo.jpg", link: "/" },
            { name: "Quần", image: "/Quần.jpg", link: "/" },
            { name: "Phụ Kiện", image: "/phukien.jpg", link: "/" },
          ].map((category) => (
            <Link
              key={category.name}
              href={category.link}
              className="group relative h-[800px] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h3 className="text-white text-2xl font-bold p-6">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 px-10 max-md:px-4 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Sản Phẩm Nổi Bật</h2>
          <p className="text-gray-600">Những sản phẩm được yêu thích nhất</p>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg overflow-hidden shadow animate-pulse"
              >
                <div className="h-[300px] bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="w-[220px] flex flex-col gap-2"
              >
                <Image
                  src={product.media[0]}
                  alt={product.title}
                  width={250}
                  height={300}
                  className="rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
                />
                <div className="text-center">
                  <h4 className="font-bold text-sm mb-2 hover:text-red-500 transition-colors line-clamp-2">
                    {product.title}
                  </h4>
                  <span className="text-red-500 font-bold text-sm">
                    {product.price.toLocaleString("vi-VN")}₫
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <Link
            href="/product"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
          >
            Xem Tất Cả Sản Phẩm
          </Link>
        </div>
      </section>

      <section className="py-16 px-10 max-md:px-4">
        <div className="relative h-[300px] rounded-2xl overflow-hidden">
          <Image
            src="/pexels_leeloo_thefirst_5723936.webp"
            alt="Promo"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center">
            <div className="text-white px-4">
              <h2 className="text-4xl max-md:text-2xl font-bold mb-4">
                Đăng Ký Nhận Ưu Đãi
              </h2>
              <p className="text-xl max-md:text-lg mb-6">
                Giảm giá 10% cho đơn hàng đầu tiên
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 px-4 py-3 rounded-lg text-black"
                />
                <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transition-colors">
                  Đăng Ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="thongtinthuonghieu"
        className="py-16 px-10 max-md:px-4 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Về MyFashion</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Nơi phong cách gặp gỡ chất lượng
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/Banner.png"
                alt="MyFashion Store"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Câu Chuyện Của Chúng Tôi
              </h3>
              <p className="text-gray-600 leading-relaxed">
                MyFashion được thành lập với niềm đam mê mang đến những sản phẩm
                thời trang chất lượng cao, phù hợp với phong cách sống hiện đại.
                Chúng tôi tin rằng mỗi người đều xứng đáng có được những món đồ
                giúp họ tự tin thể hiện bản thân.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Với hơn 10 năm kinh nghiệm trong ngành thời trang, chúng tôi cam
                kết mang đến trải nghiệm mua sắm tuyệt vời nhất cho khách hàng,
                từ chất lượng sản phẩm đến dịch vụ chăm sóc khách hàng.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎯</span>
              </div>
              <h4 className="text-xl font-bold mb-3">Sứ Mệnh</h4>
              <p className="text-gray-600">
                Mang phong cách thời trang đẳng cấp đến gần hơn với mọi người,
                giúp bạn tự tin tỏa sáng mỗi ngày
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">👁️</span>
              </div>
              <h4 className="text-xl font-bold mb-3">Tầm Nhìn</h4>
              <p className="text-gray-600">
                Trở thành thương hiệu thời trang hàng đầu Việt Nam, được yêu
                thích và tin tưởng bởi hàng triệu khách hàng
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💎</span>
              </div>
              <h4 className="text-xl font-bold mb-3">Giá Trị Cốt Lõi</h4>
              <p className="text-gray-600">
                Chất lượng - Uy tín - Sáng tạo. Luôn đặt khách hàng làm trung
                tâm trong mọi quyết định của chúng tôi
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-10 max-md:px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          Tại Sao Chọn Chúng Tôi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              title: "Miễn Phí Vận Chuyển",
              description: "Cho đơn hàng trên 500k",
            },
            {
              title: "Đổi Trả Dễ Dàng",
              description: "Trong vòng 30 ngày",
            },
            {
              title: "Thanh Toán Bảo Mật",
              description: "100% an toàn",
            },
            {
              title: "Hỗ Trợ 24/7",
              description: "Tư vấn nhiệt tình",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-500">
                  {index + 1}
                </span>
              </div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Home;
