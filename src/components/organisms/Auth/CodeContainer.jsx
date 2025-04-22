import { CodeCard } from "./CodeCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { verificationCode } from "@/hooks/apis/auth/verificationCode";



export const CodeContainer = () => {
  const [verificationForm, setVerificationForm] = useState({
    email: "",
    verificationCode: Array(5).fill(""),
  });
  const [validationErrors, setValidationErrors] = useState(null);
  const { isPending, isSuccess, error, verificationMutation} =
  verificationCode();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/auth/signin");
      }, 3000);
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verificationForm.email) {
      setValidationErrors({ message: "Email is required" });
      return;
    }

    if (verificationForm.verificationCode.includes("")) {
      setValidationErrors({ message: "All fields of verification code are required" });
      return;
    }

    setValidationErrors(null);

    await verificationMutation({
     email: verificationForm.email,
     otp: verificationForm.verificationCode.join(""),
   });
   

   console.log("Sending to mutation:", {
     email: verificationForm.email,
     otp: verificationForm.verificationCode.join(""),
   });
   
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVerificationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const updatedCode = [...verificationForm.verificationCode];
    updatedCode[index] = value;

    setVerificationForm((prev) => ({
      ...prev,
      verificationCode: updatedCode,
    }));

    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <CodeCard
      error={error}
      isPending={isPending}
      isSuccess={isSuccess}
      verificationForm={verificationForm}
      validationErrors={validationErrors}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleOtpChange={handleOtpChange}
    />
  );
};

