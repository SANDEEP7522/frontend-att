import { getEmployeeAttendance } from "@/apis/atteendance";
import { useAuth } from "@/hooks/context/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

export const useGetAtteandance = (employee) => {
  const { auth } = useAuth();
  const { toast } = useToast();

  const { data, error, isLoading } = useQuery({
    queryKey: ["attendance", employee],
    queryFn: async () => {
      if (!auth?.token) {
        throw new Error("User not authenticated");
      }
      return await getEmployeeAttendance({ employee, token: auth.token });
    },
    enabled: !!employee, // Avoid query when employee is null
    onError: (err) => {
      console.error("Error fetching attendance:", err);
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
