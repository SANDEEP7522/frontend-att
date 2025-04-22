import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/context/useAuth";
import { useToast } from "@/hooks/use-toast";
import { LogOutIcon, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const UserButton = () => {
  const navigator = useNavigate();
  const { auth, logOut } = useAuth();
  const { toast } = useToast();

  async function logOutHandler() {
    await logOut();
    toast({
      title: "signed out Successfully ",
      message: "You have been signed out successfully",
      type: "success",
    })
    navigator('/auth/signin')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative outline-none">
        <Avatar>
          <AvatarImage />
          <AvatarFallback className="text-black text-2xl">
            {auth?.user?.name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem className="cursor-pointer">
          <Settings />
          Setting
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logOutHandler} className="cursor-pointer">
          <LogOutIcon />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
