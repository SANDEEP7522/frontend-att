import AbsenteesReport from "@/components/organisms/ReportPages/AbsenteesReport";
import { PresentReport } from "@/components/organisms/ReportPages/PresentReport";
import React from "react";

const Reports = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto w-screen bg-slack">
      <h2 className="text-3xl font-bold mb-6 text-center">Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className=" p-6 rounded-2xl shadow-xl border-2">
          <h3 className="text-xl font-semibold mb-4">Present</h3>
         <PresentReport />
        </div>

        {/* Right Column */}
        <div className="p-6 rounded-2xl shadow-md border-2">
          <h3 className="text-xl font-semibold mb-4">Absent</h3>
         <AbsenteesReport />
        </div>
      </div>
    </div>
  );
};

export default Reports;
