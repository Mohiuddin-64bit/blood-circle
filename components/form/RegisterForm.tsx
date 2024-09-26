"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { DonnerFormValidation } from "@/lib/validation";
import { FormFieldTypes } from "./UserForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  BloodGroupOptions,
  donnerFormDefaultValues,
  GenderOptions,
  identificationTypes,
} from "@/constants";
import { SelectItem } from "../ui/select";
import FileUploader from "./FileUploader";
import { useRouter } from "next/navigation";
import { registerDonner } from "@/lib/actions/donar.action";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RegisterForm = ({ user }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  console.log(user);

  const form = useForm<z.infer<typeof DonnerFormValidation>>({
    resolver: zodResolver(DonnerFormValidation),
    defaultValues: {
      ...donnerFormDefaultValues,
    },

    
  });

  async function onSubmit(values: z.infer<typeof DonnerFormValidation>) {
    setIsLoading(true);
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });
      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    try {
      const donnerData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };

      const donner = await registerDonner(donnerData);
      if (donner) {
        router.push(`/profile/${donner?.$id}`);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="firstName"
            label="First Name*"
            placeholder="Iqbal"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="lastName"
            label="Last Name*"
            placeholder="Hossain"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="email"
            label="Email *"
            placeholder="donnar@gmail.com"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.PHONE_INPUT}
            name="phone"
            label="Phone Number *"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.DATE_PICKER}
            name="birthDate"
            label="Date of Birth *"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.SKELETON}
            name="gender"
            label="Gender *"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <label className="cursor-pointer" htmlFor={option}>
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="address"
            label="Address *"
            placeholder="1234 Main street, New York"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="occupation"
            label="Occupation *"
            placeholder="Doctor"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="emergencyContactName"
            label="Emergency Contact Name"
            placeholder="Guardian's Name"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="emergencyContactNumber"
            label="Emergency Contact Number"
            placeholder="017XXXXXXXX"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.SELECT}
            name="bloodGroup"
            label="Blood Group *"
            placeholder="Select Blood Group"
          >
            {BloodGroupOptions.map((option) => (
              <SelectItem key={option} value={option}>
                <p>{option}</p>
              </SelectItem>
            ))}
          </CustomFormField>
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="weight"
            label="Weight (kg) *"
            placeholder="60"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="height"
            label="Height (feet) *"
            placeholder="5' 10''"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.TEXTAREA}
            name="allergies"
            label="Allergies"
            placeholder="Peanuts, Dust, etc."
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="medications"
            label="Medications"
            placeholder="Paracetamol, etc."
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.TEXTAREA}
            name="medicalConditions"
            label="Medical Conditions"
            placeholder="Asthma, Diabetes, etc."
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Lifestyle Information</h2>
          </div>
        </section>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.SELECT}
            name="smokingStatus"
            label="Smoking Status *"
            placeholder="Select Yes / No"
          >
            {["Yes", "No"].map((option) => (
              <SelectItem key={option} value={option}>
                <p>{option}</p>
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.SELECT}
            name="alcoholConsumption"
            label="Alcohol Consumption *"
            placeholder="Select Yes / No"
          >
            {["Yes", "No"].map((option) => (
              <SelectItem key={option} value={option}>
                <p>{option}</p>
              </SelectItem>
            ))}
          </CustomFormField>
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.SELECT}
            name="tattoos"
            label="Any Recent Tattoos or Piercings *"
            placeholder="Select Yes / No"
          >
            {["Yes", "No"].map((option) => (
              <SelectItem key={option} value={option}>
                <p>{option}</p>
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.SELECT}
            name="Vaccinations"
            label="Any Recent Vaccinations *"
            placeholder="Select Yes / No"
          >
            {["Yes", "No"].map((option) => (
              <SelectItem key={option} value={option}>
                <p>{option}</p>
              </SelectItem>
            ))}
          </CustomFormField>
        </div>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Donation History</h2>
          </div>
        </section>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.SELECT}
            name="donationHistory"
            label="Donation in the past 4 months *"
            placeholder="Select Yes / No"
          >
            {["Yes", "No"].map((option) => (
              <SelectItem key={option} value={option}>
                <p>{option}</p>
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.DATE_PICKER}
            name="lastDonationDate"
            label="Last Donation Date *"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.SELECT}
            name="IdentificationType"
            label="Identification Type"
            placeholder="Select Identification Type"
          >
            {identificationTypes.map((option) => (
              <SelectItem key={option} value={option}>
                <p>{option}</p>
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="IdentificationNumber"
            label="Identification Number"
            placeholder="123456789"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.SKELETON}
            name="identificationDocument"
            label="Upload Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </div>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldTypes.CHECKBOX}
          name="donationConsent"
          label="I consent to donate blood"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldTypes.CHECKBOX}
          name="privacyConsent"
          label="I agree to the Privacy Policy"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldTypes.CHECKBOX}
          name="disclosureConsent"
          label="I agree to the Disclosure Policy"
        />

        <SubmitButton isLoading={isLoading}>Register</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
