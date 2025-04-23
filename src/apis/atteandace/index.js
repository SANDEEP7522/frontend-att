import axios from "axios";

export const fetchAttendanceReport = async ({ month, year }) => {
  const response = await axios.get(
    `/reports/attendance?month=${month}&year=${year}`
  );
  return response.data;
};

