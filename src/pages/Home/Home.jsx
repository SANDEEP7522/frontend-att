import { Navbar } from "@/components/atoms/Navebar/Navebar";

export const Home = () => {
  return (
    <div className=" h-screen w-screen flex flex-col">
      <Navbar />
      <div className="flex-1 p-4">
        <p className="text-3xl font-bold">Welcome to my website</p>
      </div>
    </div>
  );
};

