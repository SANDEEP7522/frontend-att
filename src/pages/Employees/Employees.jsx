import { EmployeeImage } from "@/components/atoms/Employee/Employee";
import { Navbar } from "@/components/atoms/Navebar/Navebar";
import { EmployCreate } from "@/components/organisms/Employ/EmployContainer";
import EmployeeList from "@/components/organisms/Employ/EmployeeList";

export const Employees = () => {
  return (
    <div className="min-h-screen w-screen p-4 sm:p-6 space-y-6 bg-slack">
      <Navbar />
      <h1 className="text-5xl font-bold text-center ">Add Employees By Admins</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 shadow-xl ">
        <div>
          <EmployCreate />
        </div>

        <div className="mb-6 ">
          <EmployeeImage />
        </div>
      </div>

      <div className="w-full rounded-xl border p-4 sm:p-6 shadow-md">
      <EmployeeList />
      </div>
    </div>
  );
};
