import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="px-10 py-12 max-md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Về MyFashion</h3>
            <p className="text-sm mb-4">
              MyFashion - Điểm đến lý tưởng cho những tín đồ thời trang. Chúng
              tôi mang đến những sản phẩm chất lượng cao với giá cả hợp lý.
            </p>
            <div className="flex gap-3">
              <Link
                href="/"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              Liên Kết Nhanh
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-red-500 transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-500 transition-colors">
                  Sản phẩm mới
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-500 transition-colors">
                  Ưu đãi
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-500 transition-colors">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  href="/order-history"
                  className="hover:text-red-500 transition-colors"
                >
                  Kiểm tra đơn hàng
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              Hỗ Trợ Khách Hàng
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-red-500 transition-colors">
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-500 transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-500 transition-colors">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-500 transition-colors">
                  Hướng dẫn mua hàng
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-500 transition-colors">
                  Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">Liên Hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>123 Đường ABC, Quận XYZ, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a
                  href="tel:0123456789"
                  className="hover:text-red-500 transition-colors"
                >
                  0123 456 789
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a
                  href="mailto:info@myfashion.com"
                  className="hover:text-red-500 transition-colors"
                >
                  info@myfashion.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-sm mb-2">Giờ làm việc:</p>
              <p className="text-sm">Thứ 2 - Thứ 7: 8:00 - 22:00</p>
              <p className="text-sm">Chủ nhật: 9:00 - 21:00</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 px-10 py-6 max-md:px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2025 MyFashion. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-red-500 transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/" className="hover:text-red-500 transition-colors">
              Điều khoản dịch vụ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
