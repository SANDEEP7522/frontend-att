// Protected Route component use this component to protect your routes

import { useAuth } from "@/hooks/context/useAuth";
import { LucideLoader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth(); // Assuming you have a useAuth hook to access auth state

//   useEffect(() => {}, [auth.isLoading]);

  if (auth.isLoading) {
    return <div>
     <LucideLoader2 className="animate-spin" />Loading............
    </div>
  }

  if (!auth.user || !auth.token) {
    return <Navigate to="/auth/signin" />;
  }

  return children;
};
