import { Navbar } from "@/components/atoms/Navebar/Navebar";
import { useGetEmploy } from "@/hooks/apis/employ/useGetEmploy";
import { useEffect } from "react";

export const Home = () => {
  // After write hooks useGetEmploy to check api response
  const { isFetching, employees } = useGetEmploy();

  useEffect(() => {
    if (isFetching) return;
      console.log(" downloading employees", employees);
    
    if (employees.length === 0 || !employees) {
      console.log('no employees are present');
    }

  }, [employees, isFetching]);

  return (
    <div className=" h-screen w-screen flex flex-col">
      <Navbar />
      <div className="flex-1 p-4">
        <p className="text-3xl font-bold">Welcome to my website</p>
      </div>
    </div>
  );
};

