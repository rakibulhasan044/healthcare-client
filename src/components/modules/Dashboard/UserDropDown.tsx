"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/services/auth/logoutUser";
import { UserInfo } from "@/types/user.interface";
import { LogOutIcon, LayoutDashboardIcon, UserCircleIcon } from "lucide-react";
import Link from "next/link";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";

interface UserDropDownProps {
  userInfo: UserInfo;
}
const UserDropDown = ({ userInfo }: UserDropDownProps) => {
  const handleLogout = async () => {
    await logoutUser();
  };

  const dashboardRoute = getDefaultDashboardRoute(userInfo?.role as string);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className="flex items-center gap-2">
            <UserCircleIcon className="h-4 w-4" />
            <span className="max-w-[100px] truncate">
              {userInfo?.name || userInfo?.email?.split("@")[0] || "User"}
            </span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <Link href={"/my-profile"} className="flex w-full items-center gap-2">
            <UserCircleIcon className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={dashboardRoute}
            className="flex w-full items-center gap-2"
          >
            <LayoutDashboardIcon className="h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={handleLogout}
          className="cursor-pointer"
        >
          <LogOutIcon className="h-4 w-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
