import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import notFound from "@/assets/notFound.jpg";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen flex justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${notFound})` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className=" bg-opacity-90  rounded-lg text-center space-y-8"
      >
        <h1 className="text-8xl font-bold mt-10 text-slack  ">404</h1>

        <Button
          onClick={() => navigate(-1)}
          className="mb-4 px-6 py-2 text-white bg-slack transition-colors rounded-lg"
        >
          Go Back
        </Button>
      </motion.div>
    </div>
  );
};
