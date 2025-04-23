
import { Navbar } from "@/components/atoms/Navebar/Navebar";
import { AttendancePage } from "@/components/organisms/EmployeeAttendance/AttendancePage";
import { useCheckInAttendance } from "@/hooks/apis/atteandaces/useCheckInAttendance";
import { useCheckOutAttendance } from "@/hooks/apis/atteandaces/useCheckOutAttendance";
import { useGetAllAttendance } from "@/hooks/apis/atteandaces/useGetAllAttendance";
import { useGetAtteandance } from "@/hooks/apis/atteandaces/useGetAtteandance";
import { useGetEmploy } from "@/hooks/apis/employ/useGetEmploy";
import { useEffect } from "react";

export const Home = () => {
  const { isFetching, employees } = useGetEmploy();

  const firstEmployeeId = employees?.[0]?._id;

  const { data: employeeAttendance } = useGetAtteandance(firstEmployeeId);
  const { data: allAttendance } = useGetAllAttendance();
  const { checkIn } = useCheckInAttendance();
  const { checkOut } = useCheckOutAttendance();

  useEffect(() => {
    if (isFetching) return;

    // console.log("Employees:", employees);
    if (!employees || employees.length === 0) {
      console.log("❌ No employees are present");
    }

    // console.log("Attendance for first employee:", employeeAttendance);
    //  console.log("📄 All attendance:", allAttendance);

    // Dummy trigger test (remove or comment after checking once)
    if (firstEmployeeId) {
      // console.log("🔁 Simulating Check-In for employee:", firstEmployeeId);
      checkIn(firstEmployeeId);

      setTimeout(() => {
        console.log("⏰ Simulating Check-Out for dummy ID");
        checkOut({ id: "dummy-attendance-id", checkOut: new Date().toISOString() });
      }, 2000);
    }
  }, [employees, isFetching, employeeAttendance, allAttendance]);

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <div className="flex-1 p-4 bg-slack">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800 text-center sm:text-left">
          Welcome to my <span className="text-blue-600">Attendance Management</span> Website
        </h1>
        <p className="text-base sm:text-lg mt-3 text-center sm:text-left text-red-600 font-medium">
          If you <strong>check out</strong>, then you are able to <strong>check in</strong> after 24 hours.
        </p> <AttendancePage/>
      </div>
    </div>
  );
};

