import { createEmploy } from "@/apis/employ";
import { useAuth } from "@/hooks/context/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateEmploy = () => {
  const { auth } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: createEmployMutation,
  } = useMutation({
    mutationFn: async (data) => {
      if (!auth?.token) {
        throw new Error("User not authenticated");
      }
      return await createEmploy({ ...data, token: auth.token });
    },
    onSuccess: (data) => {
      console.log("Successfully Create Employ", data);
      // Refetch employee list
      queryClient.invalidateQueries(["employ-list"]);

      toast({
        title: "Successfully Created Employee",
        message: "Please wait while we redirect you...",
        type: "success",
      });
    },
    onError: (error) => {
      console.log("Failed to create Employ", error);
      toast({
        title: "Failed to create Employee",
        message: error?.message || "An error occurred",
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
  };
};
