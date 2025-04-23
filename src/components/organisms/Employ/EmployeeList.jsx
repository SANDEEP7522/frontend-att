import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useGetEmploy } from "@/hooks/apis/employ/useGetEmploy";

const EmployeeList = () => {
  const { isFetching, isSuccess, error, employees } = useGetEmploy();

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center mt-10">
        Error fetching employees: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-slack rounded">
      <h2 className="text-3xl font-bold mb-6 text-center">Employee List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees?.map((emp) => (
          <Card key={emp._id}>
            <CardContent className="p-4 space-y-2 bg-gray-400 glass-card">
              <h3 className="text-xl font-semibold">{emp.name}</h3>
              <p className="text-gray-600">
                <b>Email:</b> {emp.email}
              </p>
              <p className="text-gray-600">
                {" "}
                <b>Department:</b> {emp.designation}
              </p>
              <p className="text-gray-600">
                {" "}
                <b>Phone:</b> {emp.phone}
              </p>
              <p className="text-gray-600">
                {" "}
                <b>Created:</b> {emp.createdAt}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
