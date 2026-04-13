import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const createOrder = async (orderData) => {
  try {
    const res = await axiosInstance.post("/orders", orderData);
    return res.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Failed to create order");
    throw error;
  }
};
