import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { LucideLoader2, TriangleAlert } from "lucide-react";

export const CodeCard = ({
  verificationForm,
  validationErrors,
  handleSubmit,
  handleChange,
  handleOtpChange,
  error,
  isPending,
  isSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleResend = () => {
    navigate("/auth/signup");
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Verification Code
        </CardTitle>
        <CardDescription className="text-center">
          {" "}
          Enter the verification code sent to your email{" "}
        </CardDescription>
        {validationErrors && (
          <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm">
            <TriangleAlert size={16} />
            <p>{validationErrors.message || "Something went wrong"}</p>
          </div>
        )}

        {error && (
          <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm">
            <TriangleAlert size={16} />
            <p>{error.message || "Something went wrong"}</p>
          </div>
        )}
        {isSuccess && (
          <div className="bg-green-100 p-4 rounded-md flex items-center gap-x-2 text-sm text-green-800">
            <FaCheck size={16} className="text-green-500" />
            <p>Successful sign up, redirecting to code verification page...</p>
            <LucideLoader2 className="animate-spin" size={16} />
          </div>
        )}
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Email</label>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              value={verificationForm.email}
              onChange={handleChange}
              required
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Verification Code
            </label>
            <div className="flex gap-2 justify-center">
              {verificationForm.verificationCode.map((digit, idx) => (
                <Input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  className="w-10 text-center text-lg"
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  required
                  disabled={isPending}
                />
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button type="submit" className="glass-card" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center gap-2">
                <LucideLoader2 className="animate-spin" size={16} />{" "}
                Submitting...
              </span>
            ) : (
              "Submit"
            )}
          </Button>
        </CardFooter>
      </form>
      <p className="text-center text-sm text-muted-foreground mb-5">
        Didn't receive code?{" "}
        <span onClick={handleResend} className="text-blue-500 cursor-pointer">
          Sign Up Again
        </span>
      </p>
    </Card>
  );
};
