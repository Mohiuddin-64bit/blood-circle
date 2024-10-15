"use client";

import CustomFormField from "@/components/CustomFormField";
import { FormFieldTypes } from "@/components/form/UserForm";
import SubmitButton from "@/components/SubmitButton";
import { Form } from "@/components/ui/form";
import { updateRecoveryPassword } from "@/lib/actions/user.actions";
import { RecoveryPasswordFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const RecoveryPassword = () => {
  const searchParams = useSearchParams();
  const secret = searchParams.get("secret");
  const userId = searchParams.get("userId");
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  const form = useForm<z.infer<typeof RecoveryPasswordFormValidation>>({
    resolver: zodResolver(RecoveryPasswordFormValidation),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof RecoveryPasswordFormValidation>
  ) {
    try {
      if (values.newPassword !== values.confirmPassword) {
        form.setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }
      setIsLoading(true);
      const requestData = {
        userId,
        secret,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      };
      const response = await updateRecoveryPassword(requestData);
      toast.success("Password updated successfully");
      route.push("/login");
      console.log(response);
    } catch (error) {
      console.error("Error during password recovery:", error);
    } finally {
      setIsLoading(false);
    }
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
                <h1 className="header">Recovery Password</h1>
              </section>

              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.PASSWORD}
                name="newPassword"
                label="New Password"
                placeholder="Enter your new password"
                iconSrc="/assets/icons/password.svg"
                iconAlt="password"
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.PASSWORD}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your new password"
                iconSrc="/assets/icons/password.svg"
                iconAlt="password"
              />
              <SubmitButton isLoading={isLoading}>Change Password</SubmitButton>
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

export default RecoveryPassword;
