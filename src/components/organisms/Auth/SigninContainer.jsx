import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignin } from "@/hooks/apis/auth/useSignin";
import { SigninCard } from "./SigninCard";

export const SigninContainer = () => {
  const [validationError, setValidationError] = useState(null);
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { isPending, isSuccess, error, signinMutation } = useSignin();

  const onSigninFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!signinForm.email || !signinForm.password) {
      setValidationError({ message: "Please fill all the fields" });
      return;
    }

    setValidationError(null);

    try {
      console.log("Calling signinMutation...");
      await signinMutation(signinForm); // 👈 directly passing the form
    } catch (e) {
      console.error("Signin failed", e);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => navigate("/home"), 3000);
    }
  }, [isSuccess, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSigninForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <SigninCard
      onSigninFormSubmit={onSigninFormSubmit}
      signinForm={signinForm}
      handleChange={handleChange}
      validationError={validationError}
      error={error}
      isSuccess={isSuccess}
      isPending={isPending}
    />
  );
};
