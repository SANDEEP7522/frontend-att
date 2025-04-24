// AttendancesAdminCard.jsx
export const AttendancesAdminCard = ({ attendance }) => {
  if (!attendance) {
    return (
      <div className="border p-4 rounded-md shadow-md text-red-700">
        <p>No attendance data available.</p>
      </div>
    );
  }

  return (
    <div className="border p-4 rounded-md shadow-md m-4 bg-slack">
      <h2 className="text-lg font-semibold mb-2">
        {attendance?.employee?.name || "Unknown Employee"}
      </h2>
      <ul className="text-sm text-gray-700 space-y-1">
        {attendance.attendance?.map((entry, index) => (
          <li key={index}>
            🗓️ {new Date(entry.date).toLocaleDateString()} | ✅{" "}
            {entry.checkIn ? new Date(entry.checkIn).toLocaleTimeString() : "N/A"} - ⛔{" "}
            {entry.checkOut ? new Date(entry.checkOut).toLocaleTimeString() : "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
};
