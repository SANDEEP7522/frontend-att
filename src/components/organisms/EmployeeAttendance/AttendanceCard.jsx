
export const AttendanceCard = ({
  employee,
  isCheckedIn,
  onCheckIn,
  onCheckOut,
  isCheckInLoading,
  isCheckOutLoading,
}) => {
  return (
    <div className="border p-4 rounded-lg shadow-md ">
      <h2 className="text-xl font-semibold">{employee.name}</h2>
      <p className="text-gray-600">{employee.position}</p>
      
      <div className="mt-4">
        {isCheckedIn ? (
          <button
            onClick={onCheckOut}
            disabled={isCheckOutLoading}
            className={`w-full p-2 bg-red-500 text-white rounded-md ${
              isCheckOutLoading ? "opacity-50" : ""
            }`}
          >
            {isCheckOutLoading ? "Checking Out..." : "Check Out"}
          </button>
        ) : (
          <button
            onClick={onCheckIn}
            disabled={isCheckInLoading}
            className={`w-full p-2 bg-green-500 rounded-md ${
              isCheckInLoading ? "opacity-50" : ""
            }`}
          >
            {isCheckInLoading ? "Checking In..." : "Check In"}
          </button>
        )}
      </div>
    </div>
  );
};
