import axios from "@/config/axiosConfig";
export const fetchAttendanceReport = async ({ month, year }) => {
  try {
    console.log(`Fetching attendance for month: ${month}, year: ${year}`);
    const response = await axios.get(
      `/reports/attendance?month=${month}&year=${year}`
    );
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance report:", error);
    throw error; // Re-throw to let React Query handle it
  }
};
