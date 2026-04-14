import { useMutation, useQuery } from "@tanstack/react-query";
import { createEmergencyOrder, createOrder, getEmergencyById, getOrderById } from "../services/api";
import { showError, showSuccess } from "../utils/toast";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,

    onSuccess: (data) => {
      showSuccess("Order created successfully!");
      console.log(data);
    },

    onError: (error) => {
      showError(error.response?.data?.message || "Failed to create order");
      console.log(error.message);
    },
  });
};

export const useGetOrder = (orderId) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: false,
    retry: false,
  });
};

export const useCreateEmergencyOrder = () => {
  return useMutation({
    mutationFn: createEmergencyOrder,

    onSuccess: (data) => {
      showSuccess("Emergency order created successfully!");
      console.log(data);
    },

    onError: (error) => {
      showError(
        error.response?.data?.message || "Failed to create emergency order"
      );
      console.log(error.message);
    },
  });
}

export const useGetEmergencyOrder = (emergencyId) => {
  return useQuery({
    queryKey: ["emergency", emergencyId],
    queryFn: () => getEmergencyById(emergencyId),
    enabled: false,
    retry: false,
  });
};
