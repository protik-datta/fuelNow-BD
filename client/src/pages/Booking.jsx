import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateOrder } from "../hooks/api.hooks";
import { showSuccess, showError } from "../utils/toast";
import { useDistricts, useDivisions } from "../hooks/location.hook";
import { pageAnim } from "../lib/Shared";
import Container from "../components/common/Container";
import { motion } from "framer-motion";
import { FormField, Input, Select } from "../services/fromInputs";

const PRICE_MAP = { petrol: 125, octane: 150 };
const BOOKING_FEE = 300;
const PRESET_QUANTITIES = [5, 10, 20, 30, 50];

const Booking = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateOrder();

  // ID — district API fetch-এর জন্য
  const [selectedDivisionId, setSelectedDivisionId] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  const { data: divisions } = useDivisions();
  const { data: districts } = useDistricts(selectedDivisionId);

  const [useCustomQty, setUseCustomQty] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    division: "", // name — backend payload-এর জন্য
    district: "", // name — backend payload-এর জন্য
    address: "",
    fuelType: "petrol",
    quantity: 10,
    customQuantity: "",
    deliveryType: "same_day",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "division") {
      // value = id, কিন্তু form-এ name রাখি
      const divName =
        divisions?.data?.find((d) => String(d.id) === String(value))?.name ||
        value;
      setSelectedDivisionId(value);
      setSelectedDistrictId(""); // district reset
      setForm((prev) => ({ ...prev, division: divName, district: "" }));
      return;
    }

    if (name === "district") {
      // value = id, কিন্তু form-এ name রাখি
      const distName =
        districts?.data?.find((d) => String(d.id) === String(value))?.name ||
        value;
      setSelectedDistrictId(value);
      setForm((prev) => ({ ...prev, district: distName }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // derived price
  const pricePerLitre = PRICE_MAP[form.fuelType] || 0;
  const finalQty = useCustomQty
    ? Number(form.customQuantity) || 0
    : Number(form.quantity);
  const productPrice = pricePerLitre * finalQty;
  const totalPrice = productPrice + BOOKING_FEE;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.division ||
      !form.district
    ) {
      return showError("সব তথ্য পূরণ করুন");
    }

    if (!finalQty || finalQty < 1) {
      return showError("সঠিক পরিমাণ দিন");
    }

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      division: form.division.trim(), // name string ✅
      district: form.district.trim(), // name string ✅
      address: form.address.trim(),
      fuelType: form.fuelType,
      deliveryType: form.deliveryType,
      ...(useCustomQty
        ? { customQuantity: Number(form.customQuantity) }
        : { quantity: Number(form.quantity) }),
    };

    mutate(payload, {
      onSuccess: (data) => {
        showSuccess("অর্ডার সফলভাবে স্থাপন করা হয়েছে");
        navigate(
          `success?orderId=${data.data.orderID}&price=${data.data.remaining}`,
        );
      },
      onError: () => {
        showError("অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      },
    });
  };

  return (
    <motion.div {...pageAnim} key="book" className="py-30">
      <Container>
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-[34px] font-extrabold text-dark">
            ⛽ ফুয়েল বুকিং
          </h1>
          <p className="text-muted mt-1.5">নিচের তথ্য পূরণ করে অর্ডার করুন।</p>
        </div>

        {/* FORM */}
        <div className="flex justify-center">
          <div className="bg-white rounded-3xl w-full max-w-3xl p-8 border border-border-custom shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col gap-5">
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

              <FormField label="বিভাগ">
                <Select
                  name="division"
                  value={selectedDivisionId} // ID — Select display-এর জন্য
                  onChange={(value) =>
                    handleChange({ target: { name: "division", value } })
                  }
                  placeholder="বিভাগ নির্বাচন করুন"
                  required
                >
                  {divisions?.data?.map((d) => (
                    <option key={d.id} value={d.id}>
                      {" "}
                      {/* value=id */}
                      {d.name}
                    </option>
                  ))}
                </Select>
              </FormField>

              <FormField label="জেলা">
                <Select
                  name="district"
                  value={selectedDistrictId} // ID — Select display-এর জন্য
                  onChange={(value) =>
                    handleChange({ target: { name: "district", value } })
                  }
                  placeholder="জেলা নির্বাচন করুন"
                  disabled={!selectedDivisionId}
                  required
                >
                  {districts?.data?.map((d) => (
                    <option key={d.id} value={d.id}>
                      {" "}
                      {/* value=id */}
                      {d.name}
                    </option>
                  ))}
                </Select>
              </FormField>

              <FormField label="ঠিকানা">
                <Input
                  name="address"
                  value={form.address}
                  onChange={(value) =>
                    handleChange({ target: { name: "address", value } })
                  }
                  placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
                  required
                />
              </FormField>

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
                          ? "border-emerald-500 bg-emerald-100 text-emerald-700"
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

              <FormField label="ডেলিভারি টাইপ">
                <Select
                  name="deliveryType"
                  value={form.deliveryType}
                  onChange={(value) =>
                    handleChange({ target: { name: "deliveryType", value } })
                  }
                  placeholder="ডেলিভারি টাইপ নির্বাচন করুন"
                  required
                >
                  <option value="same_day">সেইম ডে ডেলিভারি</option>
                  <option value="next_day">নেক্সট ডে ডেলিভারি</option>
                </Select>
              </FormField>

              {/* PRICE INFO */}
              <div className="bg-section-bg rounded-2xl p-5 mt-2.5">
                <div className="flex justify-between mb-2">
                  <span className="text-muted text-[15px]">
                    ⛽ প্রডাক্ট মূল্য
                  </span>
                  <span className="font-bold text-dark">{productPrice} ৳</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted text-[15px]">📦 বুকিং চার্জ</span>
                  <span className="font-bold text-dark">{BOOKING_FEE} ৳</span>
                </div>
                <hr className="border-t border-border-custom my-3" />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-dark text-[16px]">
                    💰 মোট পরিশোধযোগ্য
                  </span>
                  <span className="font-extrabold text-[20px] text-primary">
                    {totalPrice} ৳
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <p className="font-bold text-dark mb-1">💳 পেমেন্ট পদ্ধতি:</p>
                <p className="text-sm text-muted mb-2">
                  বুকিং চার্জ {BOOKING_FEE} ৳ অ্যাডভান্স পাঠান:
                </p>
                <p className="font-bold text-dark">
                  📱 বিকাশ (পার্সোনাল):{" "}
                  <span className="text-accent">01839524426</span>
                </p>
                <p className="text-[13px] text-muted mt-1">
                  বাকি {productPrice} ৳ কুরিয়ারে প্রদান করবেন।
                </p>
              </div>

              {/* SUBMIT */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                onClick={handleSubmit}
                disabled={isPending}
                className={`w-full py-4 rounded-xl bg-linear-to-r from-emerald-600 to-emerald-500 text-base font-bold text-white shadow-lg shadow-emerald-500/30 transition ${
                  isPending
                    ? "cursor-not-allowed opacity-50"
                    : "hover:shadow-emerald-500/50"
                }`}
              >
                {isPending ? "অর্ডার প্রক্রিয়াধীন..." : "অর্ডার করুন"}
              </motion.button>
            </div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default Booking;
