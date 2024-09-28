"use client";

import React from "react";
import { Button } from "./ui/button";
import { logoutAccount } from "@/lib/actions/user.actions";
import { toast } from "sonner";

const LogoutButton = () => {
  const handleLogout = () => {
    const logout = logoutAccount();
    toast.success("Logout successfully");
    return logout;
  };
  return (
    <Button onClick={handleLogout} className="shad-gray-btn dot-border">
      Logout
    </Button>
  );
};

export default LogoutButton;
