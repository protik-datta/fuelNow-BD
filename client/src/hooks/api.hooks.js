import { useMutation, useQuery } from "@tanstack/react-query";
import { createEmergencyOrder, createOrder, getEmergencyById, getOrderById } from "../services/api";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {},
    onError: (error) => {},
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
    onSuccess: (data) => {},
    onError: (error) => {},
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
