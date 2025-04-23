import { checkInEmployee } from "@/apis/atteendance";
import { useAuth } from "@/hooks/context/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const useCheckInAttendance = () => {
  const { auth } = useAuth();
  const { toast } = useToast();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (employeeId) => {
      if (!auth?.token) throw new Error("User not authenticated");
      return await checkInEmployee({ employee: employeeId, token: auth.token });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        message: "Check-in successful.",
        type: "success",
      });
    },
    onError: (err) => {
      toast({
        title: "Error",
        message: "Failed to check-in. Try again.",
        type: "error",
        variant: "destructive",
      });
      console.error(err);
    },
  });

  return { checkIn: mutate, isLoading, error };
};
