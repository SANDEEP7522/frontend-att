import { getEmployeeAttendance } from "@/apis/reports";
import { useAuth } from "@/hooks/context/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

export const useGetAtteandance = (employeeId) => {
  const { auth } = useAuth();
  const { toast } = useToast();

  // console.log("Hook called with employeeId:", employeeId);

  const { data, error, isLoading } = useQuery({
    queryKey: ["attendance", employeeId],
    queryFn: async () => {
      if (!auth?.token) {
        throw new Error(" User not authenticated");
      }

      const response = await getEmployeeAttendance(employeeId);
      // console.log(" Got response in useQuery:", response);
      return response;
    },
    enabled: !!employeeId,
    onError: (err) => {
      console.error(" Error fetching attendance:", err);
      toast({
        title: "Error",
        message: "Failed to fetch attendance. Please try again.",
        type: "error",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        message: "Attendance fetched successfully.",
        type: "success",
      });
    },
    retry: 2,
  });

  return { data, error, isLoading };
};
