import axios from "@/config/axiosConfig";


export const checkInEmployee = async (employeeId) => {
  try {
    const res = await axios.post("/api/attendance", {
      employee: employeeId,
    });
    console.log("Check-in successful:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error in check-in:", error);
  }
};

export const checkOutEmployee = async (attendanceId, checkOutTime) => {
  try {
    const res = await axios.put(`/api/attendance/${attendanceId}`, {
      checkOut: checkOutTime,
    });
    console.log("Check-out successful:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error in check-out:", error);
  }
};

export const getAllAttendance = async (filters = {}) => {
  try {
    const res = await axios.get("/api/attendance", { params: filters });
    console.log("All attendance records:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching attendance:", error);
  }
};

export const getEmployeeAttendance = async (employeeId) => {
  try {
    const res = await axios.get(`/api/attendance/${employeeId}`);
    console.log("Employee attendance:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching employee attendance:", error);
  }
};

