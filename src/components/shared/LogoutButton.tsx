"use client";

import { logoutUser } from "@/services/auth/logoutUser";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logoutUser();
  };
  return (
    <Button className="bg-red-200 font-bold" variant={"outline"} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
