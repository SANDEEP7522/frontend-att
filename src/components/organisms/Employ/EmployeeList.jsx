import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useGetEmploy } from "@/hooks/apis/employ/useGetEmploy";

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isFetching, error, employees } = useGetEmploy();

  const filteredEmployees = employees?.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div className="mb-6">
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees?.length > 0 ? (
          filteredEmployees.map((emp) => (
            <Card key={emp._id}>
              <CardContent className="p-4 space-y-2 bg-gray-400 glass-card">
                <h3 className="text-xl font-semibold">{emp.name}</h3>
                <p className="text-gray-600"><b>Email:</b> {emp.email}</p>
                <p className="text-gray-600"><b>Department:</b> {emp.department}</p>
                <p className="text-gray-600"><b>Phone:</b> {emp.phone}</p>
                <p className="text-gray-600"><b>Created:</b> {new Date(emp.createdAt).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-700 col-span-full">No employee found.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
