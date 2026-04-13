import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Fuel, Zap, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PriceBadge from "./PriceBadge";

// counter
function Counter({ target = 0, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    const end =
      typeof target === "string"
        ? parseInt(target.replace(/,/g, ""), 10)
        : target;

    let startTime = null;
    const duration = 1500;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = time - startTime;

      const value = Math.min(Math.floor((progress / duration) * end), end);

      setCount(value);

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString("bn-BD")}
      {suffix}
    </span>
  );
}

// hero
function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[91vh] overflow-hidden bg-linear-to-br from-emerald-950 via-[#0f2d1e] to-[#1a3d28] flex items-center justify-center px-6 py-20">
      {/* Glow Orbs */}
      <div className="absolute top-20 left-10 h-100 w-100 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 h-75 w-75 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col items-center text-center max-w-4xl">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.7, bounce: 0.4 }}
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-400 shadow-2xl shadow-emerald-500/30"
        >
          <Fuel size={40} color="#fff" />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-5 py-2 text-sm text-emerald-200"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          বাংলাদেশের #১ ফুয়েল ডেলিভারি সেবা
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-5 text-center text-[clamp(40px,7vw,80px)] font-extrabold leading-tight text-white"
        >
          বিশ্বস্ত জ্বালানি{" "}
          <span className="bg-linear-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
            ডেলিভারি
          </span>
          <br />
          সেবা
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-10 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg"
        >
          সরকারি লাইসেন্সপ্রাপ্ত, BPC অনুমোদিত — পেট্রোল ও অকটেন আপনার
          দোরগোড়ায়।
          <br />
          আজ বুক করুন, আগামীকাল ডেলিভারি পান।
        </motion.p>

        {/* Price badges */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <PriceBadge label="পেট্রোল" price="৳১,২৫০/১০ লিটার" />
          <PriceBadge label="অকটেন" price="৳১,৫০০/১০ লিটার" accent />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/book")}
            className="flex items-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-emerald-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/30"
          >
            <Fuel size={18} />
            ফুয়েল বুক করুন
            <ChevronRight size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/emergency")}
            className="flex items-center gap-2 rounded-xl border border-amber-400/40 bg-amber-500/10 px-7 py-4 text-base font-bold text-amber-300"
          >
            <Zap size={18} />
            ইমার্জেন্সি
          </motion.button>
        </div>

        {/* 🔥 Animated Stats */}
        <div className="w-full mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-white/10 pt-10">
          {[
            { val: "10000", suffix: "+", label: "সফল ডেলিভারি" },
            { val: "64", suffix: "", label: "জেলায় সেবা" },
            { val: "500", suffix: "+", label: "পার্টনার স্টেশন" },
            { val: "98", suffix: "%", label: "সন্তুষ্ট গ্রাহক" },
          ].map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md py-8 px-6 text-center transition hover:bg-white/10"
            >
              <div className="text-2xl md:text-3xl font-extrabold text-emerald-400 text-center">
                <Counter target={s.val} suffix={s.suffix} />
              </div>

              <div className="mt-2 text-sm md:text-base text-gray-300">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
