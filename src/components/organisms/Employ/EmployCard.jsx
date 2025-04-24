import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TriangleAlert, Loader2 } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { Label } from "@/components/ui/label";

export const EmployCard = ({
  error,
  isPending,
  isSuccess,
  createForm,
  validationErrors,
  onSignupHandleSubmit,
  handleChange,
}) => {
  return (
    <div className="sm:px-6 lg:px-8 mb-6">
      <motion.div
        className="w-full max-w-lg mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="rounded-2xl shadow-xl border bg-gray-300">
          <CardHeader className="space-y-4">
            <CardTitle className="text-xl font-bold text-center text-slate-800">
              Create Employee
            </CardTitle>

            {validationErrors && (
              <div className="bg-red-200 text-red-800 p-4 rounded-md flex items-center gap-x-2 text-sm">
                <TriangleAlert size={16} />
                <p>
                  {validationErrors.message ||
                    "Please fill all required fields."}
                </p>
              </div>
            )}

            {error && (
              <div className="bg-red-200 text-red-800 p-4 rounded-md flex items-center gap-x-2 text-sm">
                <TriangleAlert size={16} />
                <p>{error.message || "Something went wrong."}</p>
              </div>
            )}

            {isSuccess && (
              <div className="bg-green-200 text-green-800 p-4 rounded-md flex items-center gap-x-2 text-sm">
                <FaCheck size={16} />
                <p>Successfully created! Redirecting...</p>
              </div>
            )}
          </CardHeader>

          <form onSubmit={onSignupHandleSubmit}>
            <CardContent className="space-y-4">
              <Input
                placeholder="full name"
                name="name"
                value={createForm.name}
                onChange={handleChange}
                className={validationErrors?.name ? "border-red-500" : ""}
                required
              />
              <Input
                placeholder="Designation"
                name="designation"
                value={createForm.designation}
                onChange={handleChange}
                className={
                  validationErrors?.designation ? "border-red-500" : ""
                }
                required
              />
              <Input
                placeholder="Department"
                name="department"
                value={createForm.department}
                onChange={handleChange}
                className={validationErrors?.department ? "border-red-500" : ""}
                required
              />
              <Input
                placeholder="Email"
                type="email"
                name="email"
                value={createForm.email}
                onChange={handleChange}
                className={validationErrors?.email ? "border-red-500" : ""}
                required
              />
              <Input
                placeholder="Phone"
                type="tel"
                name="phone"
                value={createForm.phone}
                onChange={handleChange}
                className={validationErrors?.phone ? "border-red-500" : ""}
                required
              />

              <Button
                className="w-full mt-2"
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="animate-spin mr-2" size={16} />
                ) : null}
                Create
              </Button>
            </CardContent>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};
