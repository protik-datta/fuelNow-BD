import { motion } from "framer-motion";
import { Fuel, Wallet, Zap } from "lucide-react";
import Container from "../common/Container";

// pricing card
function PricingCard({ icon, title, subtitle, prices, highlight }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={`relative rounded-2xl border p-7 transition shadow-sm ${
        highlight
          ? "border-emerald-300 bg-linear-to-br from-emerald-50 to-white shadow-emerald-100"
          : "border-gray-200 bg-white"
      }`}
    >
      {/* Badge */}
      {highlight && (
        <div className="absolute -top-3 right-5 rounded-full bg-emerald-600 px-4 py-1 text-xs font-bold text-white shadow">
          জনপ্রিয়
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${
            highlight
              ? "bg-emerald-600 text-white"
              : "bg-gray-100 text-emerald-600"
          }`}
        >
          {icon}
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>

      {/* Price list */}
      <div className="space-y-3">
        {prices.map(([qty, price], i) => (
          <div
            key={i}
            className={`flex items-center justify-between rounded-xl px-4 py-3 ${
              highlight ? "bg-white/70" : "bg-gray-50"
            }`}
          >
            <span className="font-medium text-gray-700">{qty}</span>
            <span className="text-lg font-extrabold text-emerald-600">
              {price}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Pricing() {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <Container>
        {/* Heading */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-sm font-medium text-emerald-600">
            <Wallet size={16} />
            মূল্য তালিকা
          </div>

          <h2 className="mt-4 text-4xl font-extrabold text-gray-900">
            স্বচ্ছ মূল্য নীতি
          </h2>

          <p className="mt-3 text-gray-500">
            কোনো লুকানো চার্জ নেই — যা দেখবেন, তাই দিবেন
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Petrol */}
          <PricingCard
            icon={<Fuel size={24} />}
            title="পেট্রোল"
            subtitle="নিয়মিত জ্বালানি"
            prices={[
              ["১০ লিটার", "৳১,২৫০"],
              ["১৫ লিটার", "৳১,৯৫০"],
              ["২০ লিটার", "৳২,৫০০"],
            ]}
          />

          {/* Octane */}
          <PricingCard
            icon={<Zap size={24} />}
            title="অকটেন"
            subtitle="প্রিমিয়াম জ্বালানি"
            highlight
            prices={[
              ["১০ লিটার", "৳১,৫০০"],
              ["১৫ লিটার", "৳২,২৫০"],
              ["২০ লিটার", "৳৩,০০০"],
            ]}
          />
        </div>

        {/* Note */}
        <p className="mt-8 text-center text-sm text-gray-500">
          * ডেলিভারি চার্জ ৩০০ ৳ । দাম BPC নির্ধারিত
          নীতিমালা অনুযায়ী।
        </p>
      </Container>
    </section>
  );
}

export default Pricing;
