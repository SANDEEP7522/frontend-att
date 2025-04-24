import { useCheckInEmployee } from "@/hooks/apis/atteandaces/useCheckInAttendance";
import {
  CheckCircleIcon,
  TriangleAlert,
  ClockIcon,
  UserIcon,
  IdCardIcon,
  CalendarIcon,
  RefreshCwIcon,
} from "lucide-react";
import React, { useState } from "react";

const EmployeeCheckIn = () => {
  const [employeeId, setEmployeeId] = useState("");
  const {
    mutate,
    isLoading,
    isError,
    error,
    isSuccess,
    data: attendanceData,
  } = useCheckInEmployee();

  const handleCheckIn = (e) => {
    e.preventDefault();
    if (!employeeId.trim()) return;
    mutate(employeeId);
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 rounded-lg shadow-xl glass-card">
      <h2 className="text-2xl font-bold mb-6 text-center">Employee Check-In</h2>

      <form onSubmit={handleCheckIn} className="space-y-4">
        {isError && (
          <div className="p-3 text-red-600 bg-red-50 rounded flex items-start">
            <TriangleAlert size={20} className="flex-shrink-0 mr-2 mt-0.5" />
            <span>Error: {error.response?.data?.message || error.message}</span>
          </div>
        )}

        {isSuccess && (
          <div className="p-3 text-green-600 bg-green-50 rounded flex items-start">
            <CheckCircleIcon size={20} className="flex-shrink-0 mr-2 mt-0.5" />
            <span>Check-in successful!</span>
          </div>
        )}

        <div>
          <label
            htmlFor="employeeId"
            className="block text-black mb-2 font-medium"
          >
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
          className="w-full glass-card text-white py-2 px-4 rounded hover:bg-gray-700 disabled:bg-blue-300 flex justify-center items-center"
        >
          {isLoading ? (
            <>
              <RefreshCwIcon className="animate-spin mr-2" size={18} />
              Processing...
            </>
          ) : (
            "Check In"
          )}
        </button>
      </form>

      {/* Display attendance record details */}
      {attendanceData?.data && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <IdCardIcon className="mr-2" size={18} />
            Attendance Record
          </h3>

          <div className="space-y-3">
            <div className="flex items-start">
              <UserIcon className="mr-2 mt-0.5 flex-shrink-0" size={16} />
              <div>
                <p className="text-sm font-medium text-gray-500">Employee ID</p>
                <p>{attendanceData.data.employee}</p>
              </div>
            </div>

            <div className="flex items-start">
              <IdCardIcon className="mr-2 mt-0.5 flex-shrink-0" size={16} />
              <div>
                <p className="text-sm font-medium text-gray-500">Record ID</p>
                <p>{attendanceData.data._id}</p>
              </div>
            </div>

            <div className="flex items-start">
              <ClockIcon className="mr-2 mt-0.5 flex-shrink-0" size={16} />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Check-In Time
                </p>
                <p>{new Date(attendanceData.data.checkIn).toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-start">
              <ClockIcon className="mr-2 mt-0.5 flex-shrink-0" size={16} />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Check-Out Time
                </p>
                <p>
                  {attendanceData.data.checkOut
                    ? new Date(attendanceData.data.checkOut).toLocaleString()
                    : "Not checked out yet"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CalendarIcon className="mr-2 mt-0.5 flex-shrink-0" size={16} />
              <div>
                <p className="text-sm font-medium text-gray-500">Created At</p>
                <p>
                  {new Date(attendanceData.data.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeCheckIn;
