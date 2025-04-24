// AttendanceContainer.jsx
import { useGetAllAttendance } from "@/hooks/apis/atteandaces/useGetAllAttendance";
import { useGetAtteandance } from "@/hooks/apis/atteandaces/useGetAtteandance";
import { useState } from "react";
import { AttendancesAdminCard } from "./AttendancesAdminCard";

export const AttendanceContainer = ({ employeeId }) => {
  const [filters] = useState({});
  const { data: allData, isLoading: allLoading } = useGetAllAttendance(filters);
  const { data: employeeData, isLoading: empLoading } = useGetAtteandance(employeeId);

  if (allLoading || empLoading) return <p className="p-4 text-center">Loading...</p>;

  const allAttendance = Array.isArray(allData?.data) ? allData.data : [];
  const employeeAttendance = Array.isArray(employeeData?.data) ? employeeData.data : [];

  return (
    <div className="w-screen grid grid-cols-2 md:grid-cols-2 gap-6 p-4 bg-slack">
      <div>
        <h2 className="grid grid-cols-2 md:grid-cols-2 gap-6 text-xl font-bold mb-3">All Attendance</h2>
        {allAttendance.length > 0 ? (
          allAttendance.map((entry) => (
            <AttendancesAdminCard key={entry._id} attendance={entry} />
          ))
        ) : (
          <p>No attendance records found.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3 bg-slack">Employee Attendance</h2>
        {employeeAttendance.length > 0 ? (
          employeeAttendance.map((entry) => (
            <AttendancesAdminCard key={entry._id} attendance={entry} />
          ))
        ) : (
          <p>No records for this employee. After 30 Days</p>
        )}
      </div>
    </div>
  );
};
