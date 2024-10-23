import RegisterForm from "@/components/form/RegisterForm";
import { getUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import React from "react";


const DonnerRegister = async () => {
  const user = await getUser();

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <RegisterForm user={user} type="create" />
          <p className="copyright py-12">© 2024 BloodCircle</p>
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
