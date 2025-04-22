import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LucideLoader2, TriangleAlert } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export const SigninCard = ({
  signinForm,
  handleChange,
  onSigninFormSubmit,
  validationError,
  error,
  isSuccess,
  isPending,
}) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex justify-center items-center">
    <Card className="glass-card md:w-[420px] md:h-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to access your account</CardDescription>

        {validationError && (
          <div className="bg-red-100 p-4 rounded-md text-red-600 mb-4">
            <TriangleAlert size={20} className="inline-block mr-2" />
            {validationError.message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 p-4 rounded-md text-red-600 mb-4">
            <TriangleAlert size={20} className="inline-block mr-2" />
            {error.message}
          </div>
        )}

        {isSuccess && (
          <div className="bg-green-100 p-4 rounded-md text-green-600 mb-4">
            <FaCheck className="inline-block mr-2" />
            Successfully signed in! Redirecting...
            <LucideLoader2 className="inline-block ml-2 animate-spin" />
          </div>
        )}
      </CardHeader>

      <form className="space-y-5 m-6" onSubmit={onSigninFormSubmit}>
        <Input
          placeholder="Email"
          type="email"
          name="email"
          value={signinForm?.email}
          onChange={handleChange}
          disabled={isPending}
          required
        />

        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={signinForm?.password}
          onChange={handleChange}
          disabled={isPending}
          required
        />

        <Button
          type="submit"
          disabled={isPending}
          className="glass-card"
        >
          {isPending ? "Signing In..." : "Continue"}
        </Button>
      </form>

      <Separator className="my-4" />
      <p className="text-center text-sm sm:text-base text-muted-foreground">
        🚀 Don't have an account?{" "}
        <span
          onClick={() => navigate("/auth/signup")}
          className="text-sky-600 hover:text-sky-500 underline cursor-pointer"
        >
          Sign Up ✨
        </span>
      </p>

      <p className="text-center mt-4 text-sm sm:text-base mb-2">
        Oops! Can't remember your password?{" "}
        <span
          onClick={() => navigate("/auth/forget")}
          className="text-blue-600 hover:text-blue-500 underline cursor-pointer"
        >
          🔐 Reset it here
        </span>
      </p>
    </Card>
    </div>
  );
};
