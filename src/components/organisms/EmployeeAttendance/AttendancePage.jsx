import { useCheckInAttendance } from "@/hooks/apis/atteandaces/useCheckInAttendance";
import { useCheckOutAttendance } from "@/hooks/apis/atteandaces/useCheckOutAttendance";
import { useGetEmploy } from "@/hooks/apis/employ/useGetEmploy";
import { useState } from "react";
import { AttendanceCard } from "./AttendanceCard";

export const AttendancePage = () => {
  const { employees, isFetching } = useGetEmploy();
  const [checkedInEmployees, setCheckedInEmployees] = useState([]);

  const { checkIn, isLoading: checkInLoading } = useCheckInAttendance();
  const { checkOut, isLoading: checkOutLoading } = useCheckOutAttendance();

  const handleCheckIn = (employeeId) => {
    checkIn(employeeId);
    setCheckedInEmployees((prev) => [...prev, employeeId]);
  };

  const handleCheckOut = (employeeId) => {
    checkOut({ id: employeeId, checkOut: new Date().toISOString() });
    setCheckedInEmployees((prev) => prev.filter((id) => id !== employeeId));
  };

  if (isFetching) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Attendance</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees?.map((employee) => (
          <AttendanceCard
            key={employee._id}
            employee={employee}
            isCheckedIn={checkedInEmployees.includes(employee._id)}
            onCheckIn={() => handleCheckIn(employee._id)}
            onCheckOut={() => handleCheckOut(employee._id)}
            isCheckInLoading={checkInLoading}
            isCheckOutLoading={checkOutLoading}
          />
        ))}
      </div>
    </div>
  );
};
