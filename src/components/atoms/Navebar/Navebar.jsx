import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserButton } from "../UserButton/UserButton";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAuth } from "@/hooks/context/useAuth";

export const Navbar = () => {
  const { auth } = useAuth();

  return (
    <nav className="shadow-2xl backdrop-blur-md sticky top-0 z-80">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold text-black hover:text-600 tracking-wide"
          >
            Attendance Management
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 ">
            <Link to="/auth/employees">
              <Button variant="none" className="text-black text-sm hover:text-blue-500">
                Employee
              </Button>
            </Link>
            <Link to="/report">
              <Button variant="none" className="text-blacktext-sm hover:text-blue-500">
                Report
              </Button>
            </Link>
            <Link to="/attendance">
              <Button variant="none" className="text-black text-sm hover:text-blue-500">
                Attendance
              </Button>
            </Link>
            <UserButton />
          </div>

          {/* Mobile Menu (Sheet) */}
          <div className="md:hidden ">
            <Sheet className="w-full bg-glass-card">
              <SheetTrigger asChild>
                <Button variant="none" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[240px] sm:w-[300px] glass-card "
              >
                <SheetHeader>
                  <SheetTitle className="text-pink-600 text-2xl font-bold">
                    Attendance Management
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-3">
                  <Link>
                    {" "}
                    <Card className="glass-card">
                      <CardHeader>
                        <UserButton />
                        <CardTitle className="text-pink-600">
                          {auth?.user?.name}
                        </CardTitle>
                        <CardDescription>{auth?.user?.email}</CardDescription>
                      </CardHeader>
                      <Link to="/" className="custom-link ml-6">
                        🔓 Log Out
                      </Link>
                    </Card>
                  </Link>

                  <Link to="/auth/employees">
                    <Button
                      variant="ghost"
                      className="hover:text-blue-600 cursor-pointer text-sm"
                    >
                      Employee
                    </Button>
                  </Link>
                  <Link to="/report">
                    <Button
                      variant="ghost"
                      className="hover:text-blue-600 cursor-pointer text-sm"
                    >
                      Report
                    </Button>
                  </Link>
                  <Link to="/attendance">
                    <Button
                      variant="ghost"
                      className="hover:text-blue-600 cursor-pointer text-sm"
                    >
                      Attendance
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
