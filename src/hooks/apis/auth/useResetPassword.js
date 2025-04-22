import { resetPassword } from "@/apis/auth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const useResetPassword = () => {
  const { toast } = useToast();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: resetPasswordMutation,
  } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      console.log("Successfully resetting password", data);
      toast({
        title: "Successfully resetting password",
        message: "Plese Wait take some time to redirect Signin page",
        type: "success",
      });
    },
    onError: (error) => {
      console.log("Failed resetting password", error);
      toast({
        title: "Failed sending verification code",
        message: error.message,
        type: "error",
        variant: "destructive",
      });
    },
  });
  return {
    isPending,
    isSuccess,
    error,
    resetPasswordMutation,
  };
};
