/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { LoginFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { loginAccount } from "@/lib/actions/user.actions";
import { FormFieldTypes } from "./UserForm";
import { toast } from "sonner";
import { getDonnerByUserId } from "@/lib/actions/donar.action";

import Link from "next/link";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginFormValidation>) {
    setIsLoading(true);
    try {
      const userData = {
        email: values.email,
        password: values.password,
      };
      const user = await loginAccount(userData);
      console.log(user);
      if (user) {
        toast.success("Login successful");
        const donner = await getDonnerByUserId(user?.userId);
        console.log(donner);
        const donnerId = donner?.documents[0]?.$id;
        if (donner?.total > 0) {
          router.push(`/profile/${donnerId}`);
        } else {
          router.push(`/donors/${user?.$id}/donnerRegistration`);
        }
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex-1"
        >
          <section className="mb-12 space-y-4">
            <h1 className="header">Hi there👋</h1>
            <p className="text-dark-700">Login you Account</p>
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

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.PASSWORD}
            name="password"
            label="Password"
            placeholder="Enter your password"
            iconSrc="/assets/icons/password.svg"
            iconAlt="password"
          />
          <SubmitButton isLoading={isLoading}>Login</SubmitButton>
        </form>
      </Form>
      <Link
        href="/forgot-password"
        className="mt-3 text-gray-200 cursor-pointer hover:underline"
      >
        Forgot your password?
      </Link>
    </>
  );
};

export default LoginForm;
