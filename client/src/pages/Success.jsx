import { motion } from "framer-motion";
import {
  CheckCircle,
  ExternalLink,
  Package,
  Home,
  AlertTriangle,
  Copy,
  Check,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { pageAnim } from "../lib/Shared";
import Container from "../components/common/Container";
import { useState } from "react";

export default function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "FN-XXXXXX";
  const price = searchParams.get("price") || "0";
  const bookingFee = 300;
  const remaining = Number(price) - bookingFee;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMsg = `হ্যালো FuelNow BD! আমি একটি অর্ডার করেছি।\n\n📦 অর্ডার আইডি: ${orderId}\n💰 মোট: ${price} ৳\n\nঅনুগ্রহ করে কনফার্ম করুন।`;
  const whatsappUrl = `https://wa.me/8801839524426?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <motion.div {...pageAnim} key="success">
      <Container>
        <div className="min-h-[85vh] flex items-center justify-center py-20">
          <div className="w-full max-w-120">
            {/* ── ⚠️ Warning banner — ORDER ID সংরক্ষণ করুন ── */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-3 bg-amber-50 border border-amber-300 rounded-2xl p-4 mb-4"
            >
              <AlertTriangle
                size={20}
                className="text-amber-500 shrink-0 mt-0.5"
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-amber-800 mb-0.5">
                  অর্ডার আইডি সংরক্ষণ করুন!
                </p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  এই আইডি হারিয়ে গেলে পরবর্তীতে অর্ডার ট্র্যাক করতে পারবেন না।
                  এখনই কপি করে রাখুন।
                </p>
              </div>
            </motion.div>

            {/* ── Main card ── */}
            <div className="bg-white rounded-3xl p-8 border border-border-custom shadow-[0_10px_40px_rgba(0,0,0,0.06)] text-center">
              {/* Check icon */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
                className="w-22.5 h-22.5 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mx-auto mb-5"
              >
                <CheckCircle
                  size={52}
                  className="text-emerald-500"
                  strokeWidth={1.8}
                />
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-[28px] font-extrabold text-dark mb-2">
                  অর্ডার সফল হয়েছে! 🎉
                </h1>
                <p className="text-muted text-sm">
                  আপনার অর্ডার আমাদের টিম কনফার্ম করবে শীঘ্রই।
                </p>
              </motion.div>

              {/* Order ID box — with copy button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-section-bg rounded-2xl p-5 my-6 border border-amber-200"
              >
                <p className="text-xs text-muted uppercase tracking-widest mb-2">
                  ট্র্যাকিং আইডি
                </p>
                <p className="text-[22px] font-black text-accent tracking-[2px] break-all mb-3">
                  {orderId}
                </p>
                {/* Copy button */}
                <button
                  onClick={handleCopy}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    copied
                      ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                      : "bg-white border-amber-200 text-amber-700 hover:bg-amber-50"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={13} /> কপি হয়েছে!
                    </>
                  ) : (
                    <>
                      <Copy size={13} /> আইডি কপি করুন
                    </>
                  )}
                </button>
              </motion.div>

              {/* Price breakdown */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-emerald-50 rounded-2xl p-5 mb-6 border border-emerald-100 text-left"
              >
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">📦 বুকিং চার্জ (এখন)</span>
                  <span className="font-bold text-emerald-700">
                    {bookingFee} ৳
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-muted">🚚 বাকি (ডেলিভারিতে)</span>
                  <span className="font-bold text-dark">
                    {remaining > 0 ? remaining : 0} ৳
                  </span>
                </div>
                <hr className="border-emerald-200 mb-3" />
                <div className="flex justify-between">
                  <span className="font-bold text-dark text-[15px]">
                    💰 মোট
                  </span>
                  <span className="font-extrabold text-[18px] text-primary">
                    {price} ৳
                  </span>
                </div>
              </motion.div>

              {/* WhatsApp CTA */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open(whatsappUrl, "_blank")}
                className="w-full h-13.5 rounded-2xl bg-[#25D366] text-white text-[16px] font-bold flex items-center justify-center gap-2.5 mb-3 shadow-[0_6px_20px_rgba(37,211,102,0.25)] transition-all hover:shadow-[0_8px_28px_rgba(37,211,102,0.35)]"
              >
                📱 হোয়াটসঅ্যাপে কনফার্ম করুন
                <ExternalLink size={16} />
              </motion.button>

              <p className="text-[12px] text-muted mb-6 italic">
                বুকিং চার্জ পাঠানোর পর হোয়াটসঅ্যাপে স্ক্রিনশট পাঠান
              </p>

              {/* Bottom nav */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate("/track")}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-dark flex items-center justify-center gap-2 transition-all hover:bg-slate-50 hover:border-slate-300"
                >
                  <Package size={16} />
                  অর্ডার ট্র্যাক
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-dark flex items-center justify-center gap-2 transition-all hover:bg-slate-50 hover:border-slate-300"
                >
                  <Home size={16} />
                  হোম পেজ
                </button>
              </div>
            </div>

            {/* Step hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4 bg-white rounded-2xl p-5 border border-border-custom shadow-[0_4px_15px_rgba(0,0,0,0.03)]"
            >
              <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">
                পরবর্তী ধাপ
              </p>
              {[
                {
                  step: "১",
                  text: `বিকাশে ${bookingFee} ৳ পাঠান — 01839524426`,
                },
                { step: "২", text: "হোয়াটসঅ্যাপে পেমেন্টের স্ক্রিনশট পাঠান" },
                { step: "৩", text: "আমাদের টিম অর্ডার কনফার্ম করবে" },
                { step: "৪", text: "নির্ধারিত সময়ে ফুয়েল ডেলিভারি পাবেন" },
              ].map((s) => (
                <div
                  key={s.step}
                  className="flex items-start gap-3 mb-3 last:mb-0"
                >
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {s.step}
                  </span>
                  <p className="text-sm text-dark leading-snug">{s.text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
}
