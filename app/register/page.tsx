import UserForm from "@/components/form/UserForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Link href="/" className="cursor-pointer">
            <h3 className="text-center mb-12 text-3xl font-bold">
              Blood <span className="text-green-500">Circle</span>
            </h3>
          </Link>
          <UserForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 BloodCircle. All rights reserved.
            </p>
            <Link href="/login">Login</Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={100}
        width={700}
        alt="register"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default RegisterPage;
