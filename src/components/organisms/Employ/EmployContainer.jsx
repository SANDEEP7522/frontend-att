import { useState, useEffect } from "react";
import { EmployCard } from "./EmployCard";
import { useCreateEmploy } from "@/hooks/apis/employ/useCreateEmploy";
import { useNavigate } from "react-router-dom";

export const EmployCreate = () => {
  const [createForm, setCreateForm] = useState({
    name: "",
    designation: "",
    department: "",
    email: "",
    phone: "",
  });
 
  const [validationErrors, setValidationErrors] = useState(null);

  const { isPending, isSuccess, error, createEmployMutation } = useCreateEmploy();

  // Reset form on success
  useEffect(() => {
    if (isSuccess) {
      setCreateForm({
        name: "",
        designation: "",
        department: "",
        email: "",
        phone: "",
      });
     
    }
  }, [isSuccess]);



  const onSignupHandleSubmit = async (e) => {
    e.preventDefault();

    const isFormInvalid = Object.values(createForm).some((field) => field.trim() === "");
    if (isFormInvalid) {
      setValidationErrors({ message: "All fields are required" });
      return;
    }

    setValidationErrors(null);

    await createEmployMutation({
      name: createForm.name.trim(),
      designation: createForm.designation.trim(),
      department: createForm.department.trim(),
      email: createForm.email.trim(),
      phone: createForm.phone.trim(),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <EmployCard
      error={error}
      isPending={isPending}
      isSuccess={isSuccess}
      createForm={createForm}
      validationErrors={validationErrors}
      onSignupHandleSubmit={onSignupHandleSubmit}
      handleChange={handleChange}
    />
  );
};
