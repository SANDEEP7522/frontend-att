
import { fetchAttendanceReport } from "@/apis/atteandace";
import { useQuery } from "@tanstack/react-query";

export const useAttendanceReport = ({ month, year }) => {
  return useQuery({
    queryKey: ["attendance-report", month, year],
    queryFn: () => fetchAttendanceReport({ month, year }),
    enabled: !!month && !!year, // Only run when both are available
  });
};
