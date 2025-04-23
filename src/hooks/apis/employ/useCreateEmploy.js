import { createEmploy } from "@/apis/employ";
import { useAuth } from "@/hooks/context/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const useCreateEmploy = () => {
     const { auth } = useAuth();
     const { toast } = useToast();
     const {
          isPending,
          isSuccess,
          error,
          mutateAsync: createEmployMutation,
     } = useMutation({
          mutationFn: (data) => createEmploy({ ...data, token: auth?.token }),
          onSuccess: (data) => {
               console.log("Successfully Create Employ ", data);
               toast({
                    title: "Successfully Create Employ",
                    message: "Please wait to redirect another page",
                    type: "success",
               });
          },
          onError: (error) => {
               console.log("Failed to create Employ", error);
               toast({
                    title: "Failed to create Employ",
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
          createEmployMutation,
     }
};
