import { bdApi, axiosInstance } from "../lib/axios";

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
    throw error;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const res = await axiosInstance.get(`/orders/${orderId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createEmergencyOrder = async (emergencyData) => {
  try {
    const res = await axiosInstance.post("/emergencies", emergencyData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getEmergencyById = async (emergencyId) => {
  try {
    const res = await axiosInstance.get(`/emergencies/${emergencyId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}
