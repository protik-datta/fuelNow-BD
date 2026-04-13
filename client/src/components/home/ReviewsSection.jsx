import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

function ReviewsSection() {
  const reviews = [
  {
    name: "রহিম আহমেদ",
    city: "ঢাকা",
    text: "রাতে গাড়ির তেল শেষ হয়ে গিয়েছিল। FuelNow ২ ঘন্টায় ফুয়েল পৌঁছে দিয়েছে! অসাধারণ সেবা।",
  },
  {
    name: "করিম উদ্দিন",
    city: "চট্টগ্রাম",
    text: "প্রতি সপ্তাহে অর্ডার করি। সবসময় সময়মতো ডেলিভারি হয়। খুবই নির্ভরযোগ্য।",
  },
  {
    name: "ফাতেমা বেগম",
    city: "সিলেট",
    text: "মহিলা হিসেবে পেট্রোল পাম্পে যেতে অসুবিধা হতো। এখন ঘরে বসেই পাই। ধন্যবাদ FuelNow!",
  },
  {
    name: "আব্দুল হক",
    city: "রাজশাহী",
    text: "জরুরি মুহূর্তে ফোন করেই পেয়ে গেলাম। দাম ন্যায্য, সেবা দ্রুত।",
  },
  {
    name: "নাসির উদ্দিন",
    city: "খুলনা",
    text: "ডেলিভারি খুব দ্রুত এবং সাপোর্ট টিম খুবই helpful। প্রথমবার ব্যবহার করেই impressed হয়েছি।",
  },
  {
    name: "মোছাঃ শারমিন আক্তার",
    city: "বরিশাল",
    text: "অফিসে ব্যস্ত থাকি, তাই এই সার্ভিসটা আমার জন্য খুব সুবিধাজনক।",
  },
  {
    name: "মাহফুজুর রহমান",
    city: "রংপুর",
    text: "রাস্তায় আটকে গিয়েছিলাম, ফোন করার ১ ঘণ্টার মধ্যে ফুয়েল পেয়ে যাই। lifesaver!",
  },
  {
    name: "সাইফুল ইসলাম",
    city: "ময়মনসিংহ",
    text: "প্রফেশনাল সার্ভিস, কোনো ঝামেলা নেই। পুরো প্রসেসটা খুব smooth।",
  },
  {
    name: "রুবিনা ইয়াসমিন",
    city: "কুমিল্লা",
    text: "বিশ্বাস করতে পারিনি এত সহজে ঘরে বসে ফুয়েল পাওয়া যায়। এখন নিয়মিত ব্যবহার করি।",
  },
  {
    name: "জাহিদ হাসান",
    city: "নারায়ণগঞ্জ",
    text: "ডিজিটাল রিসিপ্ট + ট্র্যাকিং সিস্টেম খুব ভালো লেগেছে। আধুনিক সার্ভিস।",
  },
];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 4000); // change every 4s

    return () => clearInterval(timer);
  }, [reviews.length]);

  const current = reviews[index];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <div className="mb-12">
          <span className="inline-block rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600">
            ⭐ গ্রাহক রিভিউ
          </span>

          <h2 className="mt-4 text-4xl font-extrabold text-gray-900">
            গ্রাহকদের মতামত
          </h2>
        </div>

        {/* Slider */}
        <div className="relative min-h-65">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
            >
              {/* Stars */}
              <div className="mb-4 flex justify-center gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={18} fill="#facc15" color="#facc15" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                "{current.text}"
              </p>

              {/* User */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-11 w-11 rounded-full bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold">
                  {current.name[0]}
                </div>

                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    {current.name}
                  </div>
                  <div className="text-sm text-gray-500">{current.city}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => {
            const reviewIndex = Math.floor((i * reviews.length) / 5);

            return (
              <button
                key={i}
                onClick={() => setIndex(reviewIndex)}
                className={`h-2.5 rounded-full transition-all ${
                  index === reviewIndex
                    ? "bg-emerald-600 w-6"
                    : "bg-gray-300 w-2.5"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
