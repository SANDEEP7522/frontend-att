import { checkOutEmployee } from "@/apis/reports";
import { useAuth } from "@/hooks/context/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

// export const useCheckOutAttendance = () => {
//   const { auth } = useAuth();
//   const { toast } = useToast();

//   const { mutate, isLoading, error, data } = useMutation({
//     mutationFn: async ({ id, checkOut }) => {
//       if (!auth?.token) throw new Error("User not authenticated");
//       return await checkOutEmployee({ id, checkOut });
//     },
//     onSuccess: (data) => {
//       console.log("✅ Checkout successful:", data);
//       toast({
//         title: "Success",
//         message: "Check-out successful.",
//         type: "success",
//       });
//     },
//     onError: (err) => {
//       toast({
//         title: "Error",
//         message: "Failed to check-out. Try again.",
//         type: "error",
//         variant: "destructive",
//       });
//       console.error(err);
//     },
//   });

//   return { checkOut: mutate, isLoading, error, data };
// };

export const useCheckOutAttendance = () => {
  const { auth } = useAuth();
  const { toast } = useToast();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async ({ id, checkOut }) => {
      if (!auth?.token) throw new Error("User not authenticated");
      
      // Ensure you're passing the correct attendance ID
      console.log("Mutating with ID:", id);
      return await checkOutEmployee({ id, checkOut });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        message: "Check-out successful.",
        type: "success",
      });
    },
    onError: (err) => {
      toast({
        title: "Error",
        message: "Failed to check-out. Try again.",
        type: "error",
        variant: "destructive",
      });
      console.error(err);
    },
  });

  return { checkOut: mutate, isLoading, error };
};
