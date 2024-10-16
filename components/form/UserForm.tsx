"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createAccount } from "@/lib/actions/user.actions";
import { ID } from "node-appwrite";
import { toast } from "sonner";
import { getDonnerByUserId } from "@/lib/actions/donar.action";

export enum FormFieldTypes {
  INPUT = "input",
  PASSWORD = "password",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  SKELETON = "skeleton",
}

const UserForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      // phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const userData = {
        userId: ID.unique(),
        email: values.email,
        name: values.name,
        password: values.password,
        // phone: values.phone,
      };
      const user = await createAccount(userData);
      if (user?.message) {
        return toast.error(user.message);
      }
      const donner = await getDonnerByUserId(user?.userId);
      const donnerId = donner?.documents[0]?.$id;
      if (donner) {
        router.push(`/profile/${donnerId}`);
      } else {
        router.push(`/donors/${user?.$id}/donnerRegistration`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there👋</h1>
          <p className="text-dark-700">Register you Account</p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldTypes.INPUT}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

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

        {/* <CustomFormField
          control={form.control}
          fieldType={FormFieldTypes.PHONE_INPUT}
          name="phone"
          label="Phone Number"
        /> */}
        <SubmitButton isLoading={isLoading}>Register</SubmitButton>
      </form>
    </Form>
  );
};

export default UserForm;
