import { forgetPassword } from "@/apis/auth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const useForgetPassword = () => {
  const { toast } = useToast();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: forgetPasswordMutation,
  } = useMutation({
    mutationFn: forgetPassword,
    onSuccess: (data) => {
      console.log("Successfully sent verification code", data);
      toast({
        title: "Successfully sent verification code",
        message: "Plese Wait take some time to redirect another page",
        type: "success",
      });
    },
    onError: (error) => {
      console.log("Failed sending verification code", error);
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
    forgetPasswordMutation,
  };
};
