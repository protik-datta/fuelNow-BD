import { bdApi, axiosInstance } from "../lib/axios";
import { showError } from "../utils/toast";

export const getDivisions = async () => {
  const res = await bdApi.get("/division");
  return res.data;
};

export const getDistrictsByDivision = async (divisionId) => {
  const res = await bdApi.get(`/district/${divisionId}`);
  return res.data;
};

export const createOrder = async (orderData) => {
  try {
    const res = await axiosInstance.post("/orders", orderData);
    return res.data;
  } catch (error) {
    console.log(error);
    showError(error.response?.data?.message || "Failed to create order");
    throw error;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const res = await axiosInstance.get(`/orders/${orderId}`);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Order not found");
    throw error;
  }
};
