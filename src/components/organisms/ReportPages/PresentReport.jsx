import { useAttendanceReport } from "@/hooks/apis/attendenceReport/useAttendanceReport";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const PresentReport = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
  const year = selectedDate.getFullYear();

  const { data, isLoading, isError } = useAttendanceReport({ month, year });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Select a month to get attendance report
      </h2>

      <div className="flex justify-center mb-6">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          className="border rounded p-2 text-center bg-slack"
        />
      </div>

      {isLoading && (
        <p className="text-center text-blue-600">Loading report...</p>
      )}
      {isError && (
        <p className="text-center text-red-500">Failed to load report.</p>
      )}

      {data && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">
            Attendance Report for {month}/{year}
          </h3>
          <div className="overflow-x-auto mt-6 shadow-xl  glass-card">
            <table className="min-w-full shadow-xl rounded-xl overflow-hidden">
              <thead className="bg-gray-400 text-slack">
                <tr>
                  <th className="text-left px-6 py-3">#</th>
                  <th className="text-left px-6 py-3">Name</th>
                  <th className="text-left px-6 py-3">Designation</th>
                  <th className="text-left px-6 py-3">Days Present</th>
                </tr>
              </thead>
              <tbody>
                {data.map((emp, index) => (
                  <tr
                    key={emp._id}
                    className="border-b hover:bg-gray-600 transition duration-150"
                  >
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3 font-medium">{emp.name}</td>
                    <td className="px-6 py-3">{emp.designation}</td>
                    <td className="px-6 py-3">{emp.totalDaysPresent}</td>
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
