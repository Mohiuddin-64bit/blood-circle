"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { Form } from "../ui/form";
import CustomFormField from "../CustomFormField";
import { FormFieldTypes } from "../form/UserForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ForgotPasswordFormValidation } from "@/lib/validation";
import SubmitButton from "../SubmitButton";

interface ForgotPassModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ForgotPassModal = ({ open, setOpen }: ForgotPassModalProps) => {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <DialogTitle className="flex items-start justify-between">
            Update Profile Information
          </DialogTitle>
          <DialogDescription>
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
                <SubmitButton isLoading={isLoading}>Login</SubmitButton>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassModal;
