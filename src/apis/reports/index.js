import axios from "@/config/axiosConfig";


export const checkInEmployee = async (employeeId) => {
  try {
    console.log(`Attempting check-in for employee: ${employeeId}`);
    const response = await axios.post(
      "/checkedIn", // Correct endpoint
      { employee: employeeId }
    );
    console.log("Check-in successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in check-in:", error.response?.data || error.message);
    throw error; // Re-throw to handle in component
  }
};

export const checkOutEmployee = async (attendanceId, checkOutTime) => {
  try {
    console.log(`Checking out attendance ID: ${attendanceId} at ${checkOutTime}`);
    const response = await axios.patch(
      `/checked-out/${attendanceId}`,
      { checkOut: checkOutTime },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log("Check-out successful:", response.data);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Check-out failed');
    }

    return response.data;
  } catch (error) {
    console.error("Error during check-out:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Failed to check out employee'
    );
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

