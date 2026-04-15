import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllOrder,
  getOrderById,
  deleteOrderById,
  updateOrderStatus,
  getAllEmergencies,
  getEmergencyById,
  deleteEmergencyById,
  updateEmergencyStatus,
} from "../services/api";
import { toast } from "react-hot-toast";

// --- Orders Hooks ---

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrder,
  });
};

export const useOrder = (orderId) => {
  return useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }) => updateOrderStatus(orderId, status),
    onSuccess: () => {
      toast.success("Order status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update order status");
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId) => deleteOrderById(orderId),
    onSuccess: () => {
      toast.success("Order deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete order");
    },
  });
};

// --- Emergencies Hooks ---

export const useEmergencies = () => {
  return useQuery({
    queryKey: ["emergencies"],
    queryFn: getAllEmergencies,
  });
};

export const useEmergency = (emergencyId) => {
  return useQuery({
    queryKey: ["emergencies", emergencyId],
    queryFn: () => getEmergencyById(emergencyId),
    enabled: !!emergencyId,
  });
};

export const useUpdateEmergencyStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ emergencyId, status }) => updateEmergencyStatus(emergencyId, status),
    onSuccess: () => {
      toast.success("Emergency status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["emergencies"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update emergency status");
    },
  });
};

export const useDeleteEmergency = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (emergencyId) => deleteEmergencyById(emergencyId),
    onSuccess: () => {
      toast.success("Emergency deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["emergencies"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete emergency");
    },
  });
};
