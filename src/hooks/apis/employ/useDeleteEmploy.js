import { deleteEmploy } from "@/apis/employ";
import { useAuth } from "@/hooks/context/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteEmploy = () => {
  const { auth } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteEmployMutation,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: async (id) => {
      if (!auth?.token) {
        throw new Error("User not authenticated");
      }
      return await deleteEmploy({ id, token: auth.token });
    },
    onSuccess: (data) => {
      console.log("Successfully deleted employee", data);

      // Invalidate the employee list query so it refreshes
      queryClient.invalidateQueries(["employ-list"]);

      toast({
        title: "Employee Deleted",
        message: "Employee has been removed successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      console.error("Error deleting employee", error);
      toast({
        title: "Failed to Delete",
        message: error?.message || "Something went wrong",
        type: "error",
        variant: "destructive",
      });
    },
  });

  return {
    deleteEmployMutation,
    isPending,
    isSuccess,
    error,
  };
};
