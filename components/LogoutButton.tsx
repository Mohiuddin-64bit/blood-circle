"use client";

import React from "react";
import { Button } from "./ui/button";
import { logoutAccount } from "@/lib/actions/user.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const logout = await logoutAccount();
      if (logout) {
        toast.success("Logout successfully");
        router.push("/login");
        setTimeout(() => {
          window.location.reload();
        }, 500); 
      } else {
        toast.error("Logout failed");
      }
      return logout;
    } catch (error) {
      toast.error("An error occurred during logout");
      console.error(error);
    }
  };
  return (
    <Button onClick={handleLogout} className="shad-gray-btn dot-border">
      Logout
    </Button>
  );
};

export default LogoutButton;