import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../services/api";
import toast from "react-hot-toast";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,

    onSuccess: (data) => {
      toast.success("Order created successfully!");
      console.log(data);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create order");
      console.log(error.message);
    },
  });
};
