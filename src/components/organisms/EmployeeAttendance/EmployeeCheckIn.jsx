import { useCheckInEmployee } from "@/hooks/apis/atteandaces/useCheckInAttendance";
import { CurrencyIcon, TriangleAlert } from "lucide-react";
import React, { useState } from "react";

const EmployeeCheckIn = () => {
  const [employeeId, setEmployeeId] = useState("");
  const { mutate, isLoading, isError, error, isSuccess } = useCheckInEmployee();

  const handleCheckIn = (e) => {
    e.preventDefault();
    if (!employeeId.trim()) return;
    mutate(employeeId);
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 rounded-lg shadow-xl glass-card">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Employee Check-In
        </h2>

        <form onSubmit={handleCheckIn} className="space-y-4 ">
          {isError && (
            <div className="p-3 text-red-600 rounded">
              <TriangleAlert size={20} className="inline-block mr-2" />
              Error: {error.response?.data?.message || error.message}
            </div>
          )}

          {isSuccess && (
            <div className="p-3 text-green-600 bg-green-50 rounded">
              <CurrencyIcon size={20} className="inline-block mr-2" />
              Check-in successful!
            </div>
          )}
          <div>
            <label htmlFor="employeeId" className="block text-black mb-2 font-medium">
              Employee ID:
            </label>
            <input
              id="employeeId"
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full p-2 border rounded bg-slack"
              placeholder="Enter employee ID"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full  glass-card text-white py-2 px-4 rounded hover:bg-gray-700 disabled:bg-blue-300"
          >
            {isLoading ? "Processing..." : "Check In"}
          </button>
        </form>
     
    </div>
  );
};

export default EmployeeCheckIn;
