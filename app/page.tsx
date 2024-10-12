import Header from "@/components/Header";
import { getDonnerByEmail } from "@/lib/actions/donar.action";
import { getUser } from "@/lib/actions/user.actions";
import checkUserCookie from "@/lib/checkUser";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const isUserAuthenticated = checkUserCookie();
  const user = await getUser();
  const userProfile = await getDonnerByEmail(user?.email);

  return (
    <>
      <Header />
      <div className="flex flex-col h-screen max-h-screen justify-center items-center">
        <h3 className="text-4xl text-center">
          Welcome to the
          <br />
          <span className="text-green-500 font-bold"> Blood Circle</span>
        </h3>
        <div className="flex flex-col md:flex-row gap-2 md:gap-7 lg:gap-12 mt-12 px-12">
          <Link href="/donner">
            <div className="flex justify-center items-center w-44 dot-border h-32 cursor-pointer hover:bg-dark-200 transition-all rounded-xl">
              Need Blood🩸
            </div>
          </Link>
          {isUserAuthenticated ? (
            <Link href={`profile/${userProfile?.documents[0]?.$id}`}>
              <div className="flex justify-center items-center w-44 dot-border h-32 cursor-pointer hover:bg-dark-200 transition-all rounded-xl">
                I&apos;m Donner
              </div>
            </Link>
          ) : (
            <Link href="/register">
              <div className="flex justify-center items-center w-44 dot-border h-32 cursor-pointer hover:bg-dark-200 transition-all rounded-xl">
                I&apos;m Donner
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
