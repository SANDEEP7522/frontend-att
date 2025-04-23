import { getAllAttendance } from "@/apis/reports";
import { useAuth } from "@/hooks/context/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

export const useGetAllAttendance = (filters = {}) => {
  const { auth } = useAuth();
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["allAttendance", filters],
    queryFn: async () => {
      if (!auth?.token) throw new Error("User not authenticated");
      return await getAllAttendance({ filters, token: auth.token });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        message: "All attendance data fetched.",
        type: "success",
      });
    },
    onError: (err) => {
      toast({
        title: "Error",
        message: "Failed to fetch all attendance.",
        type: "error",
        variant: "destructive",
      });
      console.error(err);
    },
    enabled: !!auth?.token,
  });

  return { data, isLoading, error };
};
