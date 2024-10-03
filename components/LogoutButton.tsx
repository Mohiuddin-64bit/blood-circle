"use client";

import React from "react";
import { Button } from "./ui/button";
import { logoutAccount } from "@/lib/actions/user.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    const logout = logoutAccount();
    toast.success("Logout successfully");
    router.push("/login");
    return logout;
  };
  return (
    <Button onClick={handleLogout} className="shad-gray-btn dot-border">
      Logout
    </Button>
  );
};

export default LogoutButton;
