import { useEffect, useState } from "react";
import { SignupCard } from "./SignupCard";
import { useSignup } from "@/hooks/apis/auth/useSignup";
import { useNavigate } from "react-router-dom";

export const SignupContainer = () => {
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    verificationMethod: "email",
  });

  const [validationErrors, setValidationErrors] = useState(null);
  const { isPending, isSuccess, error, signupMutation } = useSignup();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/auth/code");
      }, 3000);
      
    }
  }, [isSuccess, navigate]);

  async function onSignupHandleSubmit(e) {
    e.preventDefault();

    if (
      !signupForm.name ||
      !signupForm.email ||
      !signupForm.password
    ) {
      setValidationErrors({ message: "All fields are required" });
      return;
    }

    setValidationErrors(null);

    await signupMutation({
      name: signupForm.name,
      email: signupForm.email,
      password: signupForm.password,
      verificationMethod: signupForm.verificationMethod,
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <SignupCard
      error={error}
      isPending={isPending}
      isSuccess={isSuccess}
      signupForm={signupForm}
      setSignupForm={setSignupForm}
      validationErrors={validationErrors}
      onSignupHandleSubmit={onSignupHandleSubmit}
      handleChange={handleChange}
    />
  );
};
