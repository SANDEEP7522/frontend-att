import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAbsenteesReport = (date) => {
  return useQuery({
    queryKey: ["absentees", date],
    queryFn: async () => {
      if (!date) throw new Error("Date is required");
      const res = await axios.get(`/reports/absentees?date=${date}`);
      return res.data;
    },
    enabled: !!date, // query only runs if date is truthy
  });
};
