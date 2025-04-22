import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForgetPassword } from "@/hooks/apis/auth/useForgetPassword";
import { TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const ForgetPassword = () => {
  const [formForgetPassword, setFormForgetPassword] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormForgetPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { isPending, isSuccess, error, forgetPasswordMutation } =
    useForgetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgetPasswordMutation(formForgetPassword);
  };
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/auth/reset/:token");// it is redirecting to reset password
      }, 3000);
    }
  }, [isSuccess]);

  return (
    <Card className="glass-card">
      <CardHeader className="flex items-center justify-center">
        <CardTitle className="text-3xl">Forget Password</CardTitle>
        <CardDescription>
          Enter your email to receive new Page for reset password
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
            Email sent successfully
          </div>
        )}
      </CardHeader>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto p-6 rounded-lg shadow-md space-y-6"
      >
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email:
            </label>
            <Input
              type="email"
              name="email"
              value={formForgetPassword.email}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Enter your email"
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="glass-card">
            {isPending ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </Card>
  );
};
