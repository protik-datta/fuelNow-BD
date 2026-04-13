import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Truck, Zap, MapPin, Clock, Shield, Fuel } from "lucide-react";
import Container from '../common/Container';

function Pill({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-600">
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      {children}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function FeaturesSection() {
  const features = [
    {
      icon: <Truck size={26} />,
      title: "দ্রুত ডেলিভারি",
      desc: "আজ অর্ডার করুন, আগামীকাল আপনার দরজায় ফুয়েল পৌঁছে যাবে।",
    },
    {
      icon: <Zap size={26} />,
      title: "ইমার্জেন্সি ফুয়েল",
      desc: "পথে আটকে গেছেন? ১–৫ লিটার জরুরি ফুয়েল পান ফ্রিতে।",
    },
    {
      icon: <MapPin size={26} />,
      title: "সকল ৬৪ জেলা",
      desc: "সারাদেশে আমাদের পার্টনার ফুয়েল স্টেশন আছে।",
    },
    {
      icon: <Clock size={26} />,
      title: "রিয়েল-টাইম ট্র্যাকিং",
      desc: "আপনার অর্ডারের অবস্থান ট্র্যাক করুন রিয়েল-টাইমে।",
    },
    {
      icon: <Shield size={26} />,
      title: "নিরাপদ পেমেন্ট",
      desc: "বিকাশে সুরক্ষিত অগ্রিম পেমেন্ট সিস্টেম।",
    },
    {
      icon: <Fuel size={26} />,
      title: "পেট্রোল ও অকটেন",
      desc: "আপনার প্রয়োজন মতো জ্বালানি বেছে নিন।",
    },
  ];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-gray-50 py-20 px-6">
      <Container>
          {/* Heading */}
          <div className="text-center mb-14">
            <Pill>আমাদের সেরা</Pill>

            <h2 className="mt-4 text-4xl font-extrabold text-gray-900">
              কেন <span className="text-emerald-600">FuelNow BD</span> বেছে
              নেবেন?
            </h2>
          </div>

          {/* Grid */}
          <motion.div
            ref={ref}
            variants={stagger}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 50px rgba(16,185,129,0.15)",
                }}
                className="rounded-2xl border border-gray-200 bg-white p-7 transition"
              >
                {/* Icon */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-600">
                  {f.icon}
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {f.title}
                </h3>

                {/* Desc */}
                <p className="text-sm leading-relaxed text-gray-600">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
      </Container>
    </section>
  );
}

export default FeaturesSection;
