import { motion } from "framer-motion";
import Container from "../common/Container";
import { Camera } from "lucide-react";

import photo1 from "../../assets/Gemini_Generated_Image_6hz6ku6hz6ku6hz6.png";
import photo2 from "../../assets/Gemini_Generated_Image_6sjvwb6sjvwb6sjv.png";
import photo3 from "../../assets/Gemini_Generated_Image_7nrpar7nrpar7nrp.png";
import photo4 from "../../assets/Gemini_Generated_Image_ongzzqongzzqongz (1).png";
import photo5 from "../../assets/Gemini_Generated_Image_vrn749vrn749vrn7.png";

function GallerySection() {
  const photos = [
    {
      img: photo4,
      title: "দোরগোড়ায় ডেলিভারি",
      desc: "প্রশিক্ষিত এজেন্ট সিলড কন্টেইনারে নিরাপদে ফুয়েল পৌঁছে দেয়।",
    },
    {
      img: photo2,
      title: "গাড়িতে ফুয়েল ভরা",
      desc: "পেশাদার ডেলিভারি — আপনার গাড়িতে সরাসরি ফুয়েল ভরে দেওয়া হয়।",
    },
    {
      img: photo3,
      title: "মোবাইল ডেলিভারি",
      desc: "FuelNow ব্র্যান্ডেড মোটরসাইকেলে দ্রুত ডেলিভারি সেবা।",
    },
    {
      img: photo1,
      title: "সিলড প্যাকেজিং",
      desc: "প্রতিটি জ্বালানি ট্রান্সফার-প্রুফ সিলড কন্টেইনারে আসে।",
    },
    {
      img: photo5,
      title: "ভেরিফিকেশন সিস্টেম",
      desc: "ডিজিটাল রিসিপ্ট ও প্রতিটি ডেলিভারি ট্র্যাকযোগ্য।",
    },
    {
      img: photo5,
      title: "নিরাপদ পেমেন্ট",
      desc: "বিকাশে সুরক্ষিত লেনদেন। ডেলিভারিতে বাকি পরিশোধ।",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 px-6">
      <Container>
        {/* Heading */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-sm font-medium text-emerald-600">
            <Camera size={22} /> ডেলিভারি প্রমাণ
          </div>

          <h2 className="mt-4 text-4xl font-extrabold text-gray-900">
            রিয়েল ডেলিভারি ছবি
          </h2>

          <p className="mt-3 text-gray-500">
            প্রতিটি ডেলিভারিতে আমরা ভিডিও ও ফটো প্রমাণ প্রদান করি।
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.03 }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-xl"
            >
              {/* FULL IMAGE COVER */}
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30"></div>

                {/* Text on image */}
                <div className="absolute bottom-0 p-5 text-white">
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="text-sm text-white/80">{p.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default GallerySection;
