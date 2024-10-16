declare interface CreateUserParams {
  userId: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

declare interface CreateAccountParams {
  userId: string;
  name: string;
  email: string;
  password: string;
}

declare interface LoginAccountParams {
  email: string;
  password: string;
}

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare interface User extends CreateUserParams {
  $id: string;
}

declare type Gender = "Male" | "Female" | "Other";

declare type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

declare type Status = "active" | "inactive" | "unknown";

declare type YesOrNo = "Yes" | "No";

type IdentificationType =
  | "National ID"
  | "Passport"
  | "Driver's License"
  | "Birth Certificate"
  | string
  | undefined;

declare interface RegisterDonnerParams {
  $id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  bloodGroup: BloodGroup;
  weight: number;
  height: number;
  allergies?: string | undefined;
  medications?: string | undefined;
  medicalConditions?: string | undefined;
  smokingStatus: YesOrNo;
  alcoholConsumption: YesOrNo;
  tattoos: YesOrNo;
  Vaccinations: YesOrNo;
  firstTimeDonor?: boolean | undefined;
  lastDonationDate: Date | null;
  profilePhoto?: FormData | undefined;
  donationConsent: boolean;
  privacyConsent: boolean;
  disclosureConsent: boolean;
}
