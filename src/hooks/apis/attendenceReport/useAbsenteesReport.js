import { fetchAbsenteesReport } from "@/apis/atteandace";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/context/useAuth";

export const useAbsenteesReport = (date) => {
  const { auth } = useAuth();
  const { toast } = useToast();
  console.log(`useAbsenteesReport hook called with date: ${date}`);

  return useQuery({
    queryKey: ["absentees-report", date],
    queryFn: () => fetchAbsenteesReport(date),
    enabled: !!date && !!auth?.token, // Only run when date and auth token are available
    onError: () => {
      toast({
        title: "Error",
        message: "Failed to fetch absentees report.",
        type: "error",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        message: "Absentees report fetched successfully.",
        type: "success",
      });
    },
  });
};
