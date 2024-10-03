import Link from "next/link";
import React from "react";
import checkUserCookie from "@/lib/checkUser";
import LogoutButton from "./LogoutButton";
import { getUser } from "@/lib/actions/user.actions";

const Header = async () => {
  const user = await getUser();
  const isUserAuthenticated = checkUserCookie();

  return (
    <header className="admin-header">
      <Link href="/" className="cursor-pointer">
        <h3 className="text-center text-3xl font-bold">
          Blood <span className="text-green-500">Circle</span>
        </h3>
      </Link>
      {isUserAuthenticated && (
        <div className="flex items-center gap-5">
          <p className="w-12 cursor-pointer h-12 bg-gray-800 dot-border rounded-full">
            {user?.name.substring(0, 2).toUpperCase()}
          </p>
          <LogoutButton />
        </div>
      )}
    </header>
  );
};

export default Header;
