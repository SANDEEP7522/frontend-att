import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LucideLoader2, TriangleAlert } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
export const SignupCard = ({
  signupForm,
  setSignupForm,
  validationErrors,
  onSignupHandleSubmit,
  handleChange,
  error,
  isPending,
  isSuccess,
}) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex justify-center items-center">
    <Card className="glass-card md:w-[420px] md:h-auto ">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
        <CardDescription className="text-center">
          {" "}
          Sign up to your account{" "}
        </CardDescription>
        {validationErrors && (
          <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm">
            <TriangleAlert size={16} />
            <p>{validationErrors.message}</p>
          </div>
        )}

        {error && (
          <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm">
            <TriangleAlert size={16} />
            <p>{error}</p>
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

      <form onSubmit={onSignupHandleSubmit} className="space-y-1 mb-[-1rem]">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              value={signupForm.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={signupForm.email}
              onChange={handleChange}
              required
              disabled={isPending}
            />
          </div>

         

          <div className="space-y-2">
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={signupForm.password}
              onChange={handleChange}
              required
              disabled={isPending}
              minLength={8}
            />
          </div>

          <div className="space-y-2">
            <Label>Verification Method</Label>
            <RadioGroup
              defaultValue={signupForm.verificationMethod}
              onValueChange={(value) =>
                setSignupForm((prev) => ({
                  ...prev,
                  verificationMethod: value,
                }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email-method" />
                <Label htmlFor="email-method">Email</Label>
               
              </div>
            </RadioGroup>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button type="submit" className="glass-card" disabled={isPending}>
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <LucideLoader2 className="animate-spin" size={16} />
                Creating...
              </div>
            ) : (
              "Create Account"
            )}
          </Button>
        </CardFooter>
      </form>
      <Separator className="my-1" />
      <p className="text-center mb-2">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/auth/signin")}
        >
          Sign In
        </span>
      </p>
    </Card>
    </div>
  );
};
