import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Package,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Truck,
  Clock,
  XCircle,
} from "lucide-react";
import { pageAnim } from "../lib/Shared";
import Container from "../components/common/Container";
import { useGetOrder } from "../hooks/api.hooks";

const STATUS_STEPS = [
  {
    key: "pending",
    label: "অপেক্ষমান",
    sub: "অর্ডার গ্রহণ হয়েছে",
    icon: Clock,
  },
  {
    key: "confirmed",
    label: "কনফার্মড",
    sub: "পেমেন্ট যাচাই হয়েছে",
    icon: CheckCircle2,
  },
  {
    key: "in_transit",
    label: "চলমান",
    sub: "ফুয়েল পাঠানো হচ্ছে",
    icon: Truck,
  },
  {
    key: "delivered",
    label: "ডেলিভারড",
    sub: "সফলভাবে পৌঁছেছে",
    icon: Package,
  },
];

const STATUS_ORDER = ["pending", "confirmed", "in_transit", "delivered"];

function getStepIndex(status) {
  return STATUS_ORDER.indexOf(status);
}

const FUEL_LABEL = { petrol: "পেট্রোল", octane: "অকটেন" };
const DELIVERY_LABEL = { same_day: "সেইম ডে", next_day: "নেক্সট ডে" };

function StatusBadge({ status }) {
  const config = {
    pending: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      label: "অপেক্ষমান",
    },
    confirmed: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      label: "কনফার্মড",
    },
    in_transit: {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      border: "border-indigo-200",
      label: "চলমান",
    },
    delivered: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      label: "ডেলিভারড",
    },
    cancelled: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      label: "বাতিল",
    },
  };
  const c = config[status] || config.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${c.bg} ${c.text} ${c.border}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${c.text.replace("text", "bg")}`}
      />
      {c.label}
    </span>
  );
}

// ── main component ────────────────────────────────────────────────────────────
export default function Tracking() {
  const [inputId, setInputId] = useState("");
  const [searchedId, setSearchedId] = useState("");

  const { data, isFetching, isError, refetch } = useGetOrder(searchedId);
  const order = data?.data;

  const handleSearch = (e) => {
    e?.preventDefault();
    const trimmed = inputId.trim();
    if (!trimmed) return;
    setSearchedId(trimmed);
    // wait for searchedId to update, then refetch
    setTimeout(() => refetch(), 0);
  };

  const isCancelled = order?.status === "cancelled";
  const currentStep = isCancelled ? -1 : getStepIndex(order?.status);

  return (
    <motion.div {...pageAnim} key="track" className="py-24">
      <Container>
        <div className="max-w-2xl mx-auto">
          {/* ── Header ── */}
          <div className="text-center mb-10">
            <h1 className="text-[34px] font-extrabold text-dark">
              📦 অর্ডার ট্র্যাক
            </h1>
            <p className="text-muted mt-1.5 text-sm">
              অর্ডার আইডি দিয়ে আপনার ডেলিভারি স্ট্যাটাস জানুন
            </p>
          </div>

          {/* ── Search box ── */}
          <form onSubmit={handleSearch} className="flex gap-3 mb-8">
            <div className="relative flex-1">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
                placeholder="অর্ডার আইডি লিখুন..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-border-custom bg-white text-sm text-dark placeholder-gray-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isFetching || !inputId.trim()}
              className="px-6 py-3.5 rounded-2xl bg-linear-to-r from-emerald-600 to-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isFetching ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Search size={16} />
              )}
              খুঁজুন
            </motion.button>
          </form>

          {/* ── States ── */}
          <AnimatePresence mode="wait">
            {/* Loading */}
            {isFetching && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 text-muted text-sm"
              >
                <Loader2
                  size={32}
                  className="animate-spin text-emerald-500 mx-auto mb-3"
                />
                অর্ডার খোঁজা হচ্ছে...
              </motion.div>
            )}

            {/* Error */}
            {isError && !isFetching && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl p-5 text-sm text-red-700"
              >
                <AlertCircle size={20} className="shrink-0" />
                এই আইডিতে কোনো অর্ডার পাওয়া যায়নি। আইডিটি আবার চেক করুন।
              </motion.div>
            )}

            {/* Order found */}
            {order && !isFetching && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* ── Order summary card ── */}
                <div className="bg-white rounded-3xl p-7 border border-border-custom shadow-[0_6px_24px_rgba(0,0,0,0.05)]">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="text-xs text-muted uppercase tracking-widest mb-1">
                        অর্ডার আইডি
                      </p>
                      <p className="text-lg font-black text-accent tracking-wider">
                        {order.orderID}
                      </p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { label: "নাম", value: order.name },
                      { label: "ফোন", value: order.phone },
                      {
                        label: "জ্বালানি",
                        value: FUEL_LABEL[order.fuelType] ?? order.fuelType,
                      },
                      { label: "পরিমাণ", value: `${order.quantity} লিটার` },
                      {
                        label: "ডেলিভারি",
                        value:
                          DELIVERY_LABEL[order.deliveryType] ??
                          order.deliveryType,
                      },
                      {
                        label: "বিভাগ/জেলা",
                        value: `${order.division} / ${order.district}`,
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="bg-section-bg rounded-xl p-3.5"
                      >
                        <p className="text-[11px] text-muted uppercase tracking-wide mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-dark">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Address */}
                  <div className="bg-section-bg rounded-xl p-3.5 mb-5">
                    <p className="text-[11px] text-muted uppercase tracking-wide mb-0.5">
                      ঠিকানা
                    </p>
                    <p className="text-sm font-semibold text-dark">
                      {order.address}
                    </p>
                  </div>

                  {/* Price row */}
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3.5">
                    <span className="text-sm text-muted">
                      💰 মোট পরিশোধযোগ্য
                    </span>
                    <span className="text-lg font-extrabold text-primary">
                      {order.remaining} ৳
                    </span>
                  </div>
                </div>

                {/* ── Status timeline ── */}
                {!isCancelled ? (
                  <div className="bg-white rounded-3xl p-7 border border-border-custom shadow-[0_6px_24px_rgba(0,0,0,0.05)]">
                    <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-6">
                      ডেলিভারি অগ্রগতি
                    </p>

                    <div className="relative">
                      {/* connector line */}
                      <div className="absolute left-4.75 top-5 bottom-5 w-0.5 bg-gray-100" />
                      <div
                        className="absolute left-4.75 top-5 w-0.5 bg-emerald-400 transition-all duration-700"
                        style={{
                          height: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%`,
                        }}
                      />

                      <div className="space-y-6">
                        {STATUS_STEPS.map((step, i) => {
                          const Icon = step.icon;
                          const done = i <= currentStep;
                          const active = i === currentStep;
                          return (
                            <motion.div
                              key={step.key}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08 }}
                              className="flex items-center gap-4 relative"
                            >
                              {/* dot */}
                              <div
                                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                                  done
                                    ? "bg-emerald-500 border-emerald-500 shadow-md shadow-emerald-200"
                                    : "bg-white border-gray-200"
                                }`}
                              >
                                <Icon
                                  size={17}
                                  className={
                                    done ? "text-white" : "text-gray-300"
                                  }
                                  strokeWidth={active ? 2.5 : 2}
                                />
                                {active && (
                                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30" />
                                )}
                              </div>

                              {/* text */}
                              <div className="flex-1">
                                <p
                                  className={`text-sm font-bold ${done ? "text-dark" : "text-gray-400"}`}
                                >
                                  {step.label}
                                </p>
                                <p
                                  className={`text-xs mt-0.5 ${done ? "text-muted" : "text-gray-300"}`}
                                >
                                  {step.sub}
                                </p>
                              </div>

                              {active && (
                                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                                  বর্তমান
                                </span>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Cancelled state */
                  <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl p-5 text-sm text-red-700">
                    <XCircle size={20} className="shrink-0" />
                    এই অর্ডারটি বাতিল করা হয়েছে। বিস্তারিত জানতে আমাদের সাথে
                    যোগাযোগ করুন।
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </motion.div>
  );
}
