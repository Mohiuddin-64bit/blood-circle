import { z } from "zod";

const today = new Date();

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters"),
  // phone: z
  //   .string()
  //   .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const LoginFormValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters"),
});

export const ForgotPasswordFormValidation = z.object({
  email: z.string().email("Invalid email address"),
});

export const RecoveryPasswordFormValidation = z.object({
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters"),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters"),
});

export const DonnerFormValidation = z
  .object({
    firstName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    lastName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .refine((number) => !number || /^\+8801[3-9]\d{8}$/.test(number), {
        message:
          "Invalid phone number format. It should be a valid Bangladeshi number in the format +8801XXXXXXXXX.",
      }),
    birthDate: z.coerce
      .date() // Coerce input to a Date object
      .refine(
        (date) => date <= today, // Ensure birthDate is not in the future
        { message: "Birth date cannot be in the future" }
      )
      .refine(
        (date) => {
          const age = today.getFullYear() - date.getFullYear();
          return age >= 18 && age <= 65; // Valid age range for blood donation (e.g., 18-65 years)
        },
        { message: "Donor must be between 18 and 65 years old" }
      ),
    gender: z.enum(["Male", "Female", "Other"]),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters")
      .max(500, "Address must be at most 500 characters"),
    occupation: z
      .string()
      .min(2, "Occupation must be at least 2 characters")
      .max(500, "Occupation must be at most 500 characters"),
    emergencyContactName: z
      .string()
      .min(3, "Contact name must be at least 3 characters")
      .max(20, "Contact name must be at most 20 characters")
      .optional()
      .refine((name) => !name || (name.length >= 2 && name.length <= 50), {
        message: "Contact name must be between 2 and 50 characters",
      }),

    emergencyContactNumber: z
      .string()
      .optional()
      .refine((number) => !number || /^\+8801[3-9]\d{8}$/.test(number), {
        message:
          "Invalid phone number format. It should be a valid Bangladeshi number in the format +8801XXXXXXXXX.",
      }),

    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    weight: z
      .preprocess(
        (val) => parseFloat(val as string),
        z
          .number()
          .min(30, { message: "Weight must be at least 30 kg" })
          .max(150, { message: "Weight must be at most 150 kg" })
      )
      .refine((val) => !isNaN(val), { message: "Invalid weight format" }),

    height: z
      .preprocess(
        (val) => parseFloat(val as string),
        z
          .number()
          .min(1, { message: "Height must be at least 1 feet" }) // Adjust minimum based on realistic height (30 cm)
          .max(8, { message: "Height must be at most 7 feet" }) // Adjust maximum based on realistic height (300 cm)
      )
      .refine((val) => !isNaN(val), { message: "Invalid height format" }),

    allergies: z.string().optional(),
    medications: z.string().optional(),
    medicalConditions: z.string().optional(),
    smokingStatus: z.enum(["Yes", "No"]),
    alcoholConsumption: z.enum(["Yes", "No"]),
    tattoos: z.enum(["Yes", "No"]),
    Vaccinations: z.enum(["Yes", "No"]),
    firstTimeDonor: z.boolean().default(false).optional(),
    lastDonationDate: z.coerce.date(),
    profilePhoto: z.custom<File[]>().optional(),
    donationConsent: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: "You must consent to Donate in order to proceed",
      }),
    disclosureConsent: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: "You must consent to disclosure in order to proceed",
      }),
    privacyConsent: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: "You must consent to privacy in order to proceed",
      }),
  })
  .superRefine((data, ctx) => {
    if (!data.firstTimeDonor && !data.lastDonationDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "lastDonationDate is required if firstTimeDonor is false",
        path: ["lastDonationDate"],
      });
    }
  });

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
