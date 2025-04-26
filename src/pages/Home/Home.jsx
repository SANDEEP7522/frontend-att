import { Navbar } from "@/components/atoms/Navebar/Navebar";
import EmployeeCheckIn from "@/components/organisms/EmployeeAttendance/EmployeeCheckIn";
import CheckOutPage from "@/components/organisms/EmployeeAttendance/CheckOutPage";

export const Home = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <div className="flex-1 p-4 bg-slack">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800 text-center sm:text-left">
          Welcome to my{" "}
          <span className="text-blue-600">Attendance Management</span> Website
        </h1>
        <p className="text-base sm:text-lg mt-3 text-center sm:text-left text-red-600 font-medium">
          If you <strong>check out</strong>, then you are able to{" "}
          <strong>check in</strong> after 8 hours.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EmployeeCheckIn />
          <CheckOutPage />
        </div>
      </div>
    </div>
  );
};
