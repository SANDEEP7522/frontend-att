import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Loader2, Trash2 } from "lucide-react";
import { useGetEmploy } from "@/hooks/apis/employ/useGetEmploy";
import { useDeleteEmploy } from "@/hooks/apis/employ/useDeleteEmploy";
import { useNavigate } from "react-router-dom";

const EmployeeListContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isFetching, isSuccess, error, employees } = useGetEmploy();
  const { deleteEmployMutation, isPending: isDeleting } = useDeleteEmploy();
 const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deleteEmployMutation(id);
    } catch (err) {
      console.error("Error while deleting employee", err);
    }
  };

  const filteredEmployees = employees?.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`); // Navigating to the edit page (edit-employee route)
  };
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
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Employee List</h2>

      {/* 🔍 Search Box */}
      <div className="mb-6">
        <Input
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 mx-auto"
        />
      </div>

      {/* 📦 Employee Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees?.map((emp) => (
          <Card key={emp._id}>
            <CardContent className="p-4 space-y-2 bg-slack relative">
              <h3 className="text-xl font-semibold">{emp.name}</h3>
              <p><b>Email:</b> {emp.email}</p>
              <p><b>Designation:</b> {emp.designation}</p>
              <p><b>Department:</b> {emp.department}</p>
              <p><b>Phone:</b> {emp.phone}</p>
              <p><b>Created:</b> {new Date(emp.createdAt).toLocaleDateString()}</p>

              
              <Button
                onClick={() => handleDelete(emp._id)}
                className="absolute top-2 right-2"
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <Button
                onClick={() => handleEdit(emp._id)}
                className="absolute top-12 right-2"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmployeeListContainer;
