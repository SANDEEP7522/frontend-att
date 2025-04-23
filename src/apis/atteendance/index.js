import axios from "@/config/axiosConfig";


export const checkInEmployee = async (employee) => {
  try {
    const res = await axios.post("/checkedIn", {
      employee: employee,
    });
    console.log("Check-in successful:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error in check-in:", error);
  }
};

export const checkOutEmployee = async ({ id, checkOut }) => {
  console.log("...", {id, checkOut});
  
  try {
    if (!id || !checkOut) {
      throw new Error("Missing attendance ID or checkout time");
    }

    const res = await axios.put(`/checked-out/${id}`, {
      checkOut: checkOut,
    });
    console.log("Check-out successful:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error in check-out:", error);
    throw error;
  }
};


export const getAllAttendance = async (filters = {}) => {
  try {
    const res = await axios.get("/all-attendence", { params: filters });
     console.log("All attendance records:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching attendance:", error);
  }
};

export const getEmployeeAttendance = async (employee) => {
  // console.log("emp......", employee);
  
  if (!employee) {
    console.error("getEmployeeAttendance called without employeeId");
    return;
  }

  try {
    const res = await axios.get(`/get-one-employee-Allattendance/${employee}`);
    console.log("One Employee all attendance:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error One employee attendance........:", error);
    throw error;
  }
};

