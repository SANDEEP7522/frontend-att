import { useAbsenteesReport } from "@/hooks/apis/attendenceReport/useAbsenteesReport";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AbsenteesReport = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateString = selectedDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD

  const { data, isLoading, isError, error } = useAbsenteesReport(dateString);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Select a date to view absentees
      </h2>

      <div className="flex justify-center mb-6">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            console.log("Date changed to:", date);
            setSelectedDate(date);
          }}
          dateFormat="yyyy-MM-dd"
          className="border rounded p-2 text-center glass-card shadow-xl"
        />
      </div>

      {isLoading && (
        <p className="text-center text-blue-600">Loading report...</p>
      )}
      {isError && (
        <div className="text-center text-red-500">
          <p>Failed to load report.</p>
          <p className="text-sm">{error.message}</p>
        </div>
      )}

      {data && (
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Absentees Report for {dateString}
          </h3>
          <div className="mb-4">
            <p className="text-center text-green-600">
              Total Absentees: {data.length}
            </p>
          </div>
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full  shadow rounded-xl overflow-hidden">
              <thead className=" text-gray-700 bg-gray-500">
                <tr>
                  <th className="text-left px-6 py-3">Sr.No</th>
                  <th className="text-left px-6 py-3">Name</th>
                  <th className="text-left px-6 py-3">Designation</th>
                  <th className="text-left px-6 py-3">Department</th>
                  <th className="text-left px-6 py-3">Email</th>
                  <th className="text-left px-6 py-3">Phone</th>
                </tr>
              </thead>
              <tbody>
                {data.map((employee, index) => (
                  <tr
                    key={employee._id}
                    className="border-b hover:bg-slack  transition duration-150"
                  >
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3 font-medium">{employee.name}</td>
                    <td className="px-6 py-3">{employee.designation}</td>
                    <td className="px-6 py-3">{employee.department}</td>
                    <td className="px-6 py-3">{employee.email}</td>
                    <td className="px-6 py-3">{employee.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbsenteesReport;
