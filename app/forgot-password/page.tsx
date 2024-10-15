"use client"

import CustomFormField from "@/components/CustomFormField";
import { FormFieldTypes } from "@/components/form/UserForm";
import SubmitButton from "@/components/SubmitButton";
import { Form } from "@/components/ui/form";
import { ForgotPasswordFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ForgotPasswordFormValidation>>({
    resolver: zodResolver(ForgotPasswordFormValidation),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof ForgotPasswordFormValidation>
  ) {
    setIsLoading(true);
    console.log(values);
  }
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Link href="/" className="cursor-pointer">
            <h3 className="text-center mb-12 text-3xl font-bold">
              Blood <span className="text-green-500">Circle</span>
            </h3>
          </Link>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 flex-1"
            >
              <section className="mb-12 space-y-4 text-center">
                <h1 className="header">
                  Forgot Password
                </h1>
              </section>

              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.INPUT}
                name="email"
                label="Email"
                placeholder="donnar@gmail.com"
                iconSrc="/assets/icons/email.svg"
                iconAlt="email"
              />
              <SubmitButton isLoading={isLoading}>Sent Recovery Mail</SubmitButton>
            </form>
          </Form>

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 BloodCircle. All rights reserved.
            </p>
            <Link href="/login">login</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
