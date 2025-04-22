import { verifyUserwithCode } from "@/apis/auth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const verificationCode = () => {
     const { toast } = useToast();
     const {
          isPending,
          isSuccess,
          error,
          mutateAsync: verificationMutation,
     } = useMutation({
          mutationFn: verifyUserwithCode,
          onSuccess: (data) => {
               console.log("Successfully sent verification code", data);
               toast({
                    title: "Successfully sent verification code",
                    message: "Please check your email to verify your account",
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
          verificationMutation,
     };
}
