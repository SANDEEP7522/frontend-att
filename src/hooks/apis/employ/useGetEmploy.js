import { getEmploy } from "@/apis/employ";
import { useQuery } from "@tanstack/react-query";

export const useGetEmploy = () => {
  const { auth } = useAuth();
  const {
    isFetching,
    isSuccess,
    error,
    data: employees,
  } = useQuery({
    queryFn: () => getEmploy({ token: auth?.token }),
    queryKey: "employ",
    staleTime: 3000,
  });
  return {
    isFetching,
    isSuccess,
    error,
    employees,
  };
};
