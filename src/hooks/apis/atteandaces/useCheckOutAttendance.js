import { checkOutEmployee } from "@/apis/reports";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
export const useCheckOut = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({ attendanceId, checkOutTime }) =>
      checkOutEmployee(attendanceId, checkOutTime),
    onSuccess: () => {
      toast({
        title: "Success",
        message: "Check-out successful.",
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

