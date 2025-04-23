// AttendanceContainer.jsx
import { useGetAllAttendance } from "@/hooks/apis/atteandace/useGetAllAttendance";
import { useGetAtteandance } from "@/hooks/apis/atteandace/useGetAtteandance";
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div>
        <h2 className="text-xl font-bold mb-3">All Attendance</h2>
        {allAttendance.length > 0 ? (
          allAttendance.map((entry) => (
            <AttendancesAdminCard key={entry._id} attendance={entry} />
          ))
        ) : (
          <p>No attendance records found.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Employee Attendance</h2>
        {employeeAttendance.length > 0 ? (
          employeeAttendance.map((entry) => (
            <AttendancesAdminCard key={entry._id} attendance={entry} />
          ))
        ) : (
          <p>No records for this employee.</p>
        )}
      </div>
    </div>
  );
};
