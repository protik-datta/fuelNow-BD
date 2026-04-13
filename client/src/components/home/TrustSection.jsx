import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck, Shield, Users } from "lucide-react";
import Container from "../common/Container";

function TrustSection() {
  const items = [
    {
      icon: <BadgeCheck size={28} />,
      title: "ব্যবসায়িক লাইসেন্স",
      desc: "ট্রেড লাইসেন্সধারী নিবন্ধিত প্রতিষ্ঠান",
      color: "emerald",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "BPC অনুমোদিত",
      desc: "বাংলাদেশ পেট্রোলিয়াম কর্পোরেশন অনুমোদিত",
      color: "indigo",
    },
    {
      icon: <Shield size={28} />,
      title: "নিরাপদ লেনদেন",
      desc: "বিকাশের মাধ্যমে সুরক্ষিত পেমেন্ট সিস্টেম",
      color: "amber",
    },
    {
      icon: <Users size={28} />,
      title: "১০,০০০+ গ্রাহক",
      desc: "সারাদেশে হাজারো সন্তুষ্ট গ্রাহক",
      color: "pink",
    },
  ];

  const colorMap = {
    emerald: "bg-emerald-50 text-emerald-600",
    indigo: "bg-indigo-50 text-indigo-600",
    amber: "bg-amber-50 text-amber-600",
    pink: "bg-pink-50 text-pink-600",
  };

  return (
    <section className="bg-white py-20 px-6">
      <Container>
        {/* Heading */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-sm font-medium text-emerald-600">
            <Shield size={24} /> যাচাইকৃত সেবা
          </div>

          <h2 className="mt-4 text-4xl font-extrabold text-gray-900">
            আমাদের বিশ্বাসযোগ্যতা
          </h2>

          <p className="mt-3 text-gray-500">
            FuelNow BD একটি সরকারি লাইসেন্সপ্রাপ্ত ও যাচাইকৃত প্রতিষ্ঠান।
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm transition hover:shadow-lg"
            >
              {/* Icon */}
              <div
                className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${
                  colorMap[t.color]
                }`}
              >
                {t.icon}
              </div>

              {/* Title */}
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                {t.title}
              </h3>

              {/* Desc */}
              <p className="text-sm leading-relaxed text-gray-500">{t.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom info bar */}
        <div className="mt-12 rounded-2xl border border-gray-100 bg-gray-50 px-6 py-5">
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-700">
            <span>✅ ট্রেড লাইসেন্স নং: TL-2024-BD-00892</span>
            <span>✅ TIN: 784521236987</span>
            <span>✅ RJSC নিবন্ধন: C-156789/2024</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TrustSection;
