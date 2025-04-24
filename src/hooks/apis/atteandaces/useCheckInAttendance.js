import { checkInEmployee } from "@/apis/reports";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const useCheckInEmployee = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: (employeeId) => checkInEmployee(employeeId),
    onSuccess: () => {
      toast({
        title: "Success",
        message: "Check-in successful.",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error.message,
        type: "error",
      });
    },
  });
};
