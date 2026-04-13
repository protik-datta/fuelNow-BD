import { motion } from "framer-motion";
import { useState } from "react";
import {
  ClipboardList,
  CreditCard,
  CheckCircle,
  Truck,
  ChevronRight,
} from "lucide-react";

function Pill({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-600">
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      {children}
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "০১",
      icon: <ClipboardList size={26} />,
      title: "অর্ডার করুন",
      desc: "জ্বালানির ধরন, পরিমাণ ও ঠিকানা দিন",
    },
    {
      num: "০২",
      icon: <CreditCard size={26} />,
      title: "পেমেন্ট করুন",
      desc: "বিকাশে টাকা পাঠান ও স্ক্রিনশট আপলোড করুন",
    },
    {
      num: "০৩",
      icon: <CheckCircle size={26} />,
      title: "কনফার্মেশন",
      desc: "অ্যাডমিন পেমেন্ট ভেরিফাই করে অর্ডার কনফার্ম করবে",
    },
    {
      num: "০৪",
      icon: <Truck size={26} />,
      title: "ডেলিভারি",
      desc: "১২–২৪ ঘন্টায় আপনার ঠিকানায় ফুয়েল পৌঁছে যাবে",
    },
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <div className="mb-14 text-center">
          <Pill>সহজ প্রক্রিয়া</Pill>

          <h2 className="mt-4 text-4xl font-extrabold text-gray-900">
            কিভাবে কাজ করে?
          </h2>

          <p className="mt-3 text-gray-500">
            মাত্র ৪টি সহজ ধাপে আপনার দোরগোড়ায় জ্বালানি
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-3">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 8 }}
              className="flex cursor-pointer items-center gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:bg-gray-50"
            >
              {/* Icon Box */}
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-emerald-600">
                {s.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="text-xs font-bold text-emerald-600">
                  ধাপ {s.num}
                </div>

                <h3 className="text-lg font-bold text-gray-900">{s.title}</h3>

                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>

              {/* Arrow */}
              <ChevronRight className="text-gray-300" size={20} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
