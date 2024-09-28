import RegisterForm from "@/components/form/RegisterForm";
import { getUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DonnerRegister = async () => {

  const user = await getUser();
  console.log("user", user);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Link href="/" className="cursor-pointer">
            <h3 className="text-center mb-12 text-3xl font-bold">
              Blood <span className="text-green-500">Circle</span>
            </h3>
          </Link>

          <RegisterForm user={user} />
          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default DonnerRegister;
