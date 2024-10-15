"use client"


import { useRouter, useSearchParams } from "next/navigation";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Form } from "../ui/form";
import { FormFieldTypes } from "./UserForm";
import { useState } from "react";
import { RecoveryPasswordFormValidation } from "@/lib/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateRecoveryPassword } from "@/lib/actions/user.actions";
import { toast } from "sonner";

const RecoveryPasswordForm = () => {
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
  );
};

export default RecoveryPasswordForm;