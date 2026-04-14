import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Package,
  AlertCircle,
  CheckCircle2,
  Truck,
  Clock,
  XCircle,
  Zap,
  MapPin,
  ExternalLink,
  FileText,
} from "lucide-react";
import Loader from "../utils/Loader";
import { pageAnim } from "../lib/Shared";
import Container from "../components/common/Container";
import { useGetOrder, useGetEmergencyOrder } from "../hooks/api.hooks";

// ── Normal order steps ────────────────────────────────────────────────────────
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

// ── Emergency order steps ─────────────────────────────────────────────────────
const EMERGENCY_STATUS_STEPS = [
  {
    key: "pending",
    label: "অপেক্ষমান",
    sub: "ইমার্জেন্সি অর্ডার গ্রহণ হয়েছে",
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
    label: "রওনা হয়েছে",
    sub: "দ্রুত পাঠানো হচ্ছে",
    icon: Zap,
  },
  {
    key: "delivered",
    label: "পৌঁছেছে",
    sub: "সফলভাবে ডেলিভারি হয়েছে",
    icon: Package,
  },
];

const STATUS_ORDER = ["pending", "confirmed", "in_transit", "delivered"];

function getStepIndex(status) {
  return STATUS_ORDER.indexOf(status);
}

const FUEL_LABEL = { petrol: "পেট্রোল", octane: "অকটেন" };
const DELIVERY_LABEL = { same_day: "সেইম ডে", next_day: "নেক্সট ডে" };
const URGENCY_LABEL = {
  low: "সাধারণ জরুরি",
  medium: "মধ্যম জরুরি",
  high: "অতি জরুরি",
};

// ── Status badge ──────────────────────────────────────────────────────────────
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

// ── Order type tab button ─────────────────────────────────────────────────────
function TabButton({ active, onClick, icon: Icon, label, color }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all border ${
        active
          ? color === "red"
            ? "bg-red-500 text-white border-red-500 shadow-md shadow-red-500/20"
            : "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20"
          : "bg-white text-muted border-border-custom hover:bg-section-bg"
      }`}
    >
      <Icon size={15} />
      {label}
    </button>
  );
}

// ── Status timeline ───────────────────────────────────────────────────────────
function StatusTimeline({ steps, currentStep, isEmergency }) {
  return (
    <div className="bg-white rounded-3xl p-7 border border-border-custom shadow-[0_6px_24px_rgba(0,0,0,0.05)]">
      <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-6">
        ডেলিভারি অগ্রগতি
      </p>
      <div className="relative">
        {/* background connector */}
        <div className="absolute left-4.75 top-5 bottom-5 w-0.5 bg-gray-100" />
        {/* progress fill */}
        <div
          className={`absolute left-4.75 top-5 w-0.5 transition-all duration-700 ${
            isEmergency ? "bg-red-400" : "bg-emerald-400"
          }`}
          style={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
        <div className="space-y-6">
          {steps.map((step, i) => {
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
                <div
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    done
                      ? isEmergency
                        ? "bg-red-500 border-red-500 shadow-md shadow-red-200"
                        : "bg-emerald-500 border-emerald-500 shadow-md shadow-emerald-200"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <Icon
                    size={17}
                    className={done ? "text-white" : "text-gray-300"}
                    strokeWidth={active ? 2.5 : 2}
                  />
                  {active && (
                    <span
                      className={`absolute inset-0 rounded-full animate-ping opacity-30 ${
                        isEmergency ? "bg-red-400" : "bg-emerald-400"
                      }`}
                    />
                  )}
                </div>
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
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                      isEmergency
                        ? "text-red-600 bg-red-50 border-red-200"
                        : "text-emerald-600 bg-emerald-50 border-emerald-200"
                    }`}
                  >
                    বর্তমান
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Tracking() {
  const [inputId, setInputId] = useState("");
  const [searchedId, setSearchedId] = useState("");
  const [orderType, setOrderType] = useState("normal");

  // normal order hook
  const {
    data: normalData,
    isFetching: normalFetching,
    isError: normalError,
    refetch: normalRefetch,
  } = useGetOrder(orderType === "normal" ? searchedId : "");

  // emergency order hook
  const {
    data: emergencyData,
    isFetching: emergencyFetching,
    isError: emergencyError,
    refetch: emergencyRefetch,
  } = useGetEmergencyOrder(orderType === "emergency" ? searchedId : "");

  const isFetching =
    orderType === "normal" ? normalFetching : emergencyFetching;
  const isError = orderType === "normal" ? normalError : emergencyError;
  const order = orderType === "normal" ? normalData?.data : emergencyData?.data;

  const handleSearch = (e) => {
    e?.preventDefault();
    const trimmed = inputId.trim();
    if (!trimmed) return;
    setSearchedId(trimmed);
    setTimeout(() => {
      orderType === "normal" ? normalRefetch() : emergencyRefetch();
    }, 0);
  };

  // tab switch করলে আগের result clear করি
  const handleTabSwitch = (type) => {
    setOrderType(type);
    setSearchedId("");
    setInputId("");
  };

  const isCancelled = order?.status === "cancelled";
  const currentStep = isCancelled ? -1 : getStepIndex(order?.status);
  const isEmergency = orderType === "emergency";
  const steps = isEmergency ? EMERGENCY_STATUS_STEPS : STATUS_STEPS;

  return (
    <motion.div {...pageAnim} key="track" className="py-24">
      <Container>
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-[34px] font-extrabold text-dark">
              📦 অর্ডার ট্র্যাক
            </h1>
            <p className="text-muted mt-1.5 text-sm">
              অর্ডার আইডি দিয়ে আপনার ডেলিভারি স্ট্যাটাস জানুন
            </p>
          </div>

          {/* Tab switcher — Normal vs Emergency */}
          <div className="flex gap-3 mb-5 bg-section-bg p-1.5 rounded-2xl border border-border-custom">
            <TabButton
              active={orderType === "normal"}
              onClick={() => handleTabSwitch("normal")}
              icon={Package}
              label="সাধারণ অর্ডার"
              color="green"
            />
            <TabButton
              active={orderType === "emergency"}
              onClick={() => handleTabSwitch("emergency")}
              icon={Zap}
              label="ইমার্জেন্সি অর্ডার"
              color="red"
            />
          </div>

          {/* Search box */}
          <form onSubmit={handleSearch} className="flex gap-3 mb-8">
            <div className="relative flex-1">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
                placeholder={
                  isEmergency
                    ? "ইমার্জেন্সি অর্ডার আইডি লিখুন..."
                    : "অর্ডার আইডি লিখুন..."
                }
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-border-custom bg-white text-sm text-dark placeholder-gray-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isFetching || !inputId.trim()}
              className={`px-6 py-3.5 rounded-2xl text-white text-sm font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all ${
                isEmergency
                  ? "bg-linear-to-r from-red-600 to-red-500 shadow-red-500/25"
                  : "bg-linear-to-r from-emerald-600 to-emerald-500 shadow-emerald-500/25"
              }`}
            >
              {isFetching ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Search size={16} />
              )}
              খুঁজুন
            </motion.button>
          </form>

          {/* States */}
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
                <Loader />
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

            {/* ── Order found ── */}
            {order && !isFetching && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Order summary card */}
                <div
                  className={`bg-white rounded-3xl p-7 border shadow-[0_6px_24px_rgba(0,0,0,0.05)] ${
                    isEmergency ? "border-red-100" : "border-border-custom"
                  }`}
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="text-xs text-muted uppercase tracking-widest mb-1">
                        {isEmergency
                          ? "ইমার্জেন্সি অর্ডার আইডি"
                          : "অর্ডার আইডি"}
                      </p>
                      <p className="text-lg font-black text-accent tracking-wider">
                        {isEmergency ? order.emergencyOrderID : order.orderID}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <StatusBadge status={order.status} />
                      {isEmergency && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                          <Zap size={11} />
                          {URGENCY_LABEL[order.urgency] || "জরুরি"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {isEmergency ? (
                      // Emergency order fields
                      <>
                        {[
                          { label: "নাম", value: order.name },
                          { label: "ফোন", value: order.phone },
                          {
                            label: "জ্বালানি",
                            value: FUEL_LABEL[order.fuelType] ?? order.fuelType,
                          },
                          { label: "পরিমাণ", value: `${order.quantity} লিটার` },
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
                      </>
                    ) : (
                      // Normal order fields
                      <>
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
                      </>
                    )}
                  </div>

                  {/* Location — emergency: locationText + mapLink, normal: address */}
                  {isEmergency ? (
                    <div className="mb-5 space-y-3">
                      {/* locationText */}
                      <div className="bg-section-bg rounded-xl p-3.5">
                        <p className="text-[11px] text-muted uppercase tracking-wide mb-0.5">
                          লোকেশন
                        </p>
                        <p className="text-sm font-semibold text-dark">
                          {order.locationText}
                        </p>
                      </div>

                      {/* mapLink — থাকলেই দেখাবে */}
                      {order.mapLink && (
                        <div className="rounded-2xl overflow-hidden border border-border-custom">
                          {/* map header */}
                          <div className="flex items-center gap-2 px-4 py-3 bg-section-bg border-b border-border-custom">
                            <MapPin
                              size={14}
                              className="text-red-500 shrink-0"
                            />
                            <span className="text-xs font-semibold text-dark">
                              ম্যাপ লোকেশন
                            </span>
                            <a
                              href={order.mapLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-auto text-xs text-primary flex items-center gap-1 hover:underline"
                            >
                              Maps-এ দেখুন <ExternalLink size={11} />
                            </a>
                          </div>
                          <iframe
                            src={order.mapLink}
                            width="100%"
                            height="180"
                            style={{ border: 0, display: "block" }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Emergency location map"
                          />
                        </div>
                      )}

                      {/* note — থাকলেই দেখাবে */}
                      {order.note && (
                        <div className="bg-section-bg rounded-xl p-3.5 flex items-start gap-2">
                          <FileText
                            size={14}
                            className="text-muted shrink-0 mt-0.5"
                          />
                          <div>
                            <p className="text-[11px] text-muted uppercase tracking-wide mb-0.5">
                              নোট
                            </p>
                            <p className="text-sm font-semibold text-dark">
                              {order.note}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Normal order address
                    <div className="bg-section-bg rounded-xl p-3.5 mb-5">
                      <p className="text-[11px] text-muted uppercase tracking-wide mb-0.5">
                        ঠিকানা
                      </p>
                      <p className="text-sm font-semibold text-dark">
                        {order.address}
                      </p>
                    </div>
                  )}

                  {/* Price row */}
                  <div
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 border ${
                      isEmergency
                        ? "bg-red-50 border-red-100"
                        : "bg-emerald-50 border-emerald-100"
                    }`}
                  >
                    <span className="text-sm text-muted">
                      💰 মোট পরিশোধযোগ্য
                    </span>
                    <span
                      className={`text-lg font-extrabold ${
                        isEmergency ? "text-red-600" : "text-primary"
                      }`}
                    >
                      {isEmergency
                        ? order.totalPrice
                        : (order.remaining ?? order.totalPrice)}
                      ৳
                    </span>
                  </div>
                </div>

                {/* Status timeline or Cancelled */}
                {!isCancelled ? (
                  <StatusTimeline
                    steps={steps}
                    currentStep={currentStep}
                    isEmergency={isEmergency}
                  />
                ) : (
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
