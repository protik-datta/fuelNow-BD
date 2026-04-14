import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateEmergencyOrder } from "../hooks/api.hooks";
import { showSuccess, showError } from "../utils/toast";
import { pageAnim } from "../lib/Shared";
import Container from "../components/common/Container";
import { motion } from "framer-motion";
import { FormField, Input, Select } from "../services/fromInputs";

const PRICE_MAP = { petrol: 125, octane: 150 };
const DELIVERY_CHARGE = 300;
const PRESET_QUANTITIES = [5, 10, 20, 30, 50];

const URGENCY_OPTIONS = [
  { value: "low", label: "সাধারণ জরুরি" },
  { value: "medium", label: "মধ্যম জরুরি" },
  { value: "high", label: "অতি জরুরি" },
];

const Emergency = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateEmergencyOrder();

  const [useCustomQty, setUseCustomQty] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    locationText: "",
    mapLink: "",
    fuelType: "petrol",
    quantity: 10,
    customQuantity: "",
    urgency: "high",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // derived price
  const pricePerLitre = PRICE_MAP[form.fuelType] || 0;
  const finalQty = useCustomQty
    ? Number(form.customQuantity) || 0
    : Number(form.quantity);
  const productPrice = pricePerLitre * finalQty;
  const totalPrice = productPrice + DELIVERY_CHARGE;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.locationText) {
      return showError("নাম, ফোন ও লোকেশন পূরণ করুন");
    }
    if (!finalQty || finalQty < 1) {
      return showError("সঠিক পরিমাণ দিন");
    }

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      locationText: form.locationText.trim(),
      mapLink: form.mapLink.trim() || '',
      fuelType: form.fuelType,
      quantity: finalQty,
      urgency: form.urgency,
      note: form.note.trim(),
    };

    mutate(payload, {
      onSuccess: (data) => {
        showSuccess("ইমার্জেন্সি অর্ডার সফলভাবে স্থাপন করা হয়েছে");
        navigate(
          `success?orderId=${data.data.emergencyOrderID}&price=${data.data.totalPrice}&mapLink=${encodeURIComponent(data.data.mapLink)}`,
        );
      },
      onError: () => {
        showError("অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      },
    });
  };

  return (
    <motion.div {...pageAnim} key="emergency" className="py-30">
      <Container>
        {/* HEADER */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            ইমার্জেন্সি সার্ভিস সক্রিয়
          </div>
          <h1 className="text-[34px] font-extrabold text-dark">
            🚨 ইমার্জেন্সি ফুয়েল
          </h1>
          <p className="text-muted mt-1.5">
            জরুরি প্রয়োজনে দ্রুততম সময়ে ফুয়েল ডেলিভারি পাবেন।
          </p>
        </div>

        {/* FORM */}
        <div className="flex justify-center">
          <div className="bg-white rounded-3xl w-full max-w-3xl p-8 border border-red-100 shadow-[0_10px_30px_rgba(239,68,68,0.06)]">
            <div className="flex flex-col gap-5">
              {/* name */}
              <FormField label="নাম">
                <Input
                  name="name"
                  value={form.name}
                  onChange={(value) =>
                    handleChange({ target: { name: "name", value } })
                  }
                  placeholder="আপনার নাম লিখুন"
                  required
                />
              </FormField>

              {/* phone */}
              <FormField label="ফোন নম্বর">
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={(value) =>
                    handleChange({ target: { name: "phone", value } })
                  }
                  placeholder="আপনার ফোন নম্বর লিখুন"
                  required
                />
              </FormField>

              {/* locationText */}
              <FormField label="লোকেশন">
                <Input
                  name="locationText"
                  value={form.locationText}
                  onChange={(value) =>
                    handleChange({ target: { name: "locationText", value } })
                  }
                  placeholder="আপনার বর্তমান অবস্থান লিখুন"
                  required
                />
              </FormField>

              {/* mapLink — optional */}
              <FormField label="ম্যাপ লিংক (ঐচ্ছিক)">
                <Input
                  name="mapLink"
                  value={form.mapLink}
                  onChange={(value) =>
                    handleChange({ target: { name: "mapLink", value } })
                  }
                  placeholder="Google Maps লিংক পেস্ট করুন"
                />
              </FormField>

              {/* fuelType */}
              <FormField label="জ্বালানির ধরন">
                <Select
                  name="fuelType"
                  value={form.fuelType}
                  onChange={(value) =>
                    handleChange({ target: { name: "fuelType", value } })
                  }
                  placeholder="জ্বালানির ধরন নির্বাচন করুন"
                  required
                >
                  <option value="petrol">পেট্রোল</option>
                  <option value="octane">অকটেন</option>
                </Select>
              </FormField>

              {/* quantity */}
              <FormField label="পরিমাণ">
                <div className="flex gap-3 flex-wrap">
                  {PRESET_QUANTITIES.map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => {
                        setUseCustomQty(false);
                        handleChange({
                          target: { name: "quantity", value: qty },
                        });
                      }}
                      className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                        !useCustomQty && Number(form.quantity) === qty
                          ? "border-red-500 bg-red-100 text-red-700"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {qty} লিটার
                    </button>
                  ))}

                  <Input
                    name="customQuantity"
                    value={form.customQuantity}
                    onChange={(value) => {
                      setUseCustomQty(true);
                      handleChange({
                        target: { name: "customQuantity", value },
                      });
                    }}
                    placeholder="অন্যান্য পরিমাণ (লিটার)"
                    type="number"
                    min="1"
                    className="flex-1 min-w-50"
                  />
                </div>
              </FormField>

              {/* urgency */}
              <FormField label="জরুরি মাত্রা">
                <Select
                  name="urgency"
                  value={form.urgency}
                  onChange={(value) =>
                    handleChange({ target: { name: "urgency", value } })
                  }
                  placeholder="জরুরি মাত্রা নির্বাচন করুন"
                  required
                >
                  {URGENCY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </FormField>

              {/* note — optional */}
              <FormField label="অতিরিক্ত নোট (ঐচ্ছিক)">
                <Input
                  name="note"
                  value={form.note}
                  onChange={(value) =>
                    handleChange({ target: { name: "note", value } })
                  }
                  placeholder="যেকোনো বিশেষ তথ্য লিখুন"
                />
              </FormField>

              {/* PRICE INFO */}
              <div className="bg-red-50 rounded-2xl p-5 mt-2.5">
                <div className="flex justify-between mb-2">
                  <span className="text-muted text-[15px]">
                    ⛽ প্রডাক্ট মূল্য
                  </span>
                  <span className="font-bold text-dark">{productPrice} ৳</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted text-[15px]">
                    📦 ডেলিভারি চার্জ
                  </span>
                  <span className="font-bold text-dark">
                    {DELIVERY_CHARGE} ৳
                  </span>
                </div>
                <hr className="border-t border-red-100 my-3" />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-dark text-[16px]">
                    💰 মোট পরিশোধযোগ্য
                  </span>
                  <span className="font-extrabold text-[20px] text-red-600">
                    {totalPrice} ৳
                  </span>
                </div>
              </div>

              {/* PAYMENT */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <p className="font-bold text-dark mb-1">💳 পেমেন্ট পদ্ধতি:</p>
                <p className="text-sm text-muted mb-2">
                  ডেলিভারি চার্জ {DELIVERY_CHARGE} ৳ অ্যাডভান্স পাঠান:
                </p>
                <p className="font-bold text-dark">
                  📱 বিকাশ (পার্সোনাল):{" "}
                  <span className="text-red-500">01839524426</span>
                </p>
                <p className="text-[13px] text-muted mt-1">
                  বাকি {productPrice} ৳ ডেলিভারিতে প্রদান করবেন।
                </p>
              </div>

              {/* SUBMIT */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                onClick={handleSubmit}
                disabled={isPending}
                className={`w-full py-4 rounded-xl bg-linear-to-r from-red-600 to-red-500 text-base font-bold text-white shadow-lg shadow-red-500/30 transition ${
                  isPending
                    ? "cursor-not-allowed opacity-50"
                    : "hover:shadow-red-500/50"
                }`}
              >
                {isPending
                  ? "অর্ডার প্রক্রিয়াধীন..."
                  : "🚨 ইমার্জেন্সি অর্ডার করুন"}
              </motion.button>
            </div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default Emergency;
