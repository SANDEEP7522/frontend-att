import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaCheck } from "react-icons/fa";
import { LucideLoader2, TriangleAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useResetPassword } from "@/hooks/apis/auth/useResetPassword";

export const ResetPasswordCard = () => {
  const { token } = useParams();
  console.log('token', token);
  
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const {
    isPending,
    isSuccess,
    error,
    resetPasswordMutation,
  } = useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return toast({
        title: "Password mismatch",
        message: "Password and confirm password do not match",
        type: "error",
        variant: "destructive",
      });
    }

    await resetPasswordMutation({
      token,
      password: form.password,
      confirmPassword: form.confirmPassword,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/auth/signin");
      }, 3000);
    }
  }, [isSuccess, navigate]);

  return (
    <Card className="glass-card">
      <CardHeader className="flex items-center justify-center">
        <CardTitle className="text-3xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your new password and confirm it
        </CardDescription>

        {error && (
          <div className="bg-red-100 p-4 rounded-md text-red-600 mb-4">
            <TriangleAlert size={20} className="inline-block mr-2" />
            {error.message}
          </div>
        )}

        {isSuccess && (
          <div className="bg-green-100 p-4 rounded-md text-green-600 mb-4">
            <FaCheck className="inline-block mr-2" />
            Password reset successfully, redirecting to signin page...
            <LucideLoader2 className="animate-spin" size={16} />
          </div>
        )}
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Enter new Password......."
            onChange={handleChange}
            value={form.password}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password..........."
            onChange={handleChange}
            value={form.confirmPassword}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <Button
            type="submit"
            className="glass-card"
            disabled={isPending}
          >
            {isPending ? "Resetting..." : "Reset Password"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

