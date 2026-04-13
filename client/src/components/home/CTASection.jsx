import { motion } from "framer-motion";
import { Fuel, ChevronRight, Search, Zap, Truck, Lock } from "lucide-react";
import { useNavigate } from 'react-router-dom';

function CTASection() {
  const navigate = useNavigate()
  return (
    <section className="relative overflow-hidden py-24 px-6 text-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-950 to-black" />

      {/* Glow effect */}
      <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="relative max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
          এখনই ফুয়েল <span className="text-emerald-400">অর্ডার</span> করুন
        </h2>

        <p className="mt-5 text-gray-300 text-lg">
          নির্ভরযোগ্য ও দ্রুত জ্বালানি ডেলিভারি সেবা — সারাদেশে।
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          {/* Primary */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition"
            onClick={() => navigate("/book")}
          >
            <Fuel size={20} />
            ফুয়েল বুক করুন
            <ChevronRight size={18} />
          </motion.button>

          {/* Secondary */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/15 transition"
            onClick={() => navigate("/track")}
          >
            <Search size={20} />
            অর্ডার ট্র্যাক করুন
          </motion.button>
        </div>

        {/* Info */}
        <p className="mt-8 text-sm text-gray-400 flex items-center justify-center gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <Zap size={16} className="text-emerald-400" />
            ২৪/৭ সার্ভিস
          </span>

          <span className="flex items-center gap-1">
            <Truck size={16} className="text-emerald-400" />
            দ্রুত ডেলিভারি
          </span>

          <span className="flex items-center gap-1">
            <Lock size={16} className="text-emerald-400" />
            নিরাপদ পেমেন্ট
          </span>
        </p>
      </div>
    </section>
  );
}

export default CTASection;
