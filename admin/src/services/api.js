import { axiosInstance } from '../../../client/src/lib/axios'
import { showError } from '../utils/toast';

// orders api
export const getAllOrder = async () => {
  try {
    const res = await axiosInstance.get("/orders");
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to fetch orders");
    throw error;
  }
}

export const getOrderById = async (orderId) => {
  try {
    const res = await axiosInstance.get(`/orders/${orderId}`);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Order not found");
    throw error;
  }
}

export const deleteOrderById = async (orderId) => {
  try {
    const res = await axiosInstance.delete(`/orders/${orderId}`);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to delete order");
    throw error;
  }
}

export const updateOrderStatus = async (orderId, status) => {
  try {
    const res = await axiosInstance.patch(`/orders/${orderId}`, { status });
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to update order status");
    throw error;
  }
}

// emergency api
export const getAllEmergencies = async () => {
  try {
    const res = await axiosInstance.get("/emergencies");
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to fetch emergencies");
    throw error;
  }
}

export const getEmergencyById = async (emergencyId) => {
  try {
    const res = await axiosInstance.get(`/emergencies/${emergencyId}`);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Emergency not found");
    throw error;
  }
}

export const deleteEmergencyById = async (emergencyId) => {
  try {
    const res = await axiosInstance.delete(`/emergencies/${emergencyId}`);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to delete emergency");
    throw error;
  }
}

export const updateEmergencyStatus = async (emergencyId, status) => {
  try {
    const res = await axiosInstance.patch(`/emergencies/${emergencyId}`, { status });
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to update emergency status");
    throw error;
  }
}
