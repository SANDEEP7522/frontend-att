import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "@/hooks/apis/atteandaces/useCheckOutAttendance";
import { CurrencyIcon, TriangleAlert } from "lucide-react";

const CheckOutPage = () => {
  const [attendanceId, setAttendanceId] = useState("");
  const { mutate, isLoading, isError, error, isSuccess } = useCheckOut();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!attendanceId) return;

    // Automatically use current time for checkout
    const checkOutTime = new Date().toISOString();
    mutate({ attendanceId, checkOutTime });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 rounded-lg shadow-xl glass-card">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Employee Check-Out
      </h1>
      {isError && (
        <div className="mt-4 p-3  text-red-700 rounded-md">
          <TriangleAlert size={20} className="inline-block mr-2" />
          Error: {error.response?.data?.message || error.message}
        </div>
      )}

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md">
          <CurrencyIcon size={20} className="inline-block mr-2" />
          Check-out recorded successfully at {new Date().toLocaleTimeString()}!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="attendanceId"
            className="block text-sm font-medium text-black"
          >
            Attendance ID
          </label>
          <input
            id="attendanceId"
            type="text"
            value={attendanceId}
            onChange={(e) => setAttendanceId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md bg-slack "
            placeholder="Enter attendance ID"
            required
            autoFocus
          />
        </div>

        <div className="py-2">
          <p className="text-sm">
            Check-out time will be automatically set to current time:{" "}
            <span className="font-bold text-green-500 ">
              {" "}
              {new Date().toLocaleString()}
            </span>
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full glass-card py-2 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Processing..." : "Check Out"}
        </button>
      </form>
    </div>
  );
};

export default CheckOutPage;
