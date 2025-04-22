import { registerUser } from "@/apis/auth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  const { toast } = useToast();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: signupMutation,
  } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Successfully signed up", data);
      toast({
        title: "Successfully signed up",
        message: "Please check your email to verify your account",
        type: "success",
      });
    },
    onError: (error) => {
      console.log("Failed signing up", error);
      toast({
        title: "Failed signing up",
        message: error.message,
        type: "error",
        variant: "destructive",
      });
    },
  });

  return { isPending, isSuccess, error, signupMutation };
};
