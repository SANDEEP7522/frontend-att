import { checkOutEmployee } from "@/apis/atteendance";
import { useAuth } from "@/hooks/context/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const useCheckOutAttendance = () => {
  const { auth } = useAuth();
  const { toast } = useToast();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async ({ id, checkOut }) => {
      if (!auth?.token) throw new Error("User not authenticated");
      return await checkOutEmployee({ id, checkOut, token: auth.token });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        message: "Check-out successful.",
        type: "success",
      });
    },
    onError: (err) => {
      toast({
        title: "Error",
        message: "Failed to check-out. Try again.",
        type: "error",
        variant: "destructive",
      });
      console.error(err);
    },
  });

  return { checkOut: mutate, isLoading, error };
};
