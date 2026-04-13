import { Fuel } from "lucide-react";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white shadow-lg">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-6 py-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-emerald-600 to-emerald-400">
            <Fuel size={18} color="#fff" />
          </div>

          <span className="text-[16px] font-extrabold tracking-tight text-gray-900">
            FuelNow BD
          </span>
        </div>

        {/* Center Text */}
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-500">
            © 2026 FuelNow BD. সর্বস্বত্ব সংরক্ষিত।
          </p>

          <p className="text-xs text-gray-400 mt-1">
            ট্রেড লাইসেন্স: TL-2024-BD-00892 | TIN: 784521236987
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="rounded-xl px-3 py-2 text-sm text-white bg-linear-to-br from-emerald-600 to-emerald-400"
          >
            Facebook
          </a>

          <a
            href="#"
            className="rounded-xl px-3 py-2 text-sm text-white bg-linear-to-br from-emerald-600 to-emerald-400"
          >
            WhatsApp
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
