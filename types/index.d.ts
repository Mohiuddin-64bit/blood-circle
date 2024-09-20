declare interface CreateUserParams {
  userId: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

declare interface CreateAccountParams{
  userId: string;
  name: string;
  email: string;
  password: string;
}

declare interface LoginAccountParams{
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

declare type Status = "active" | "inactive";

declare type YesOrNo = "Yes" | "No";

type IdentificationType = "National ID" | "Passport" | "Driver's License" | "Birth Certificate" | string | undefined;


declare interface RegisterDonnerParams {
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
  weight: string;
  height: string;
  allergies?: string | undefined;
  medications?: string | undefined;
  medicalConditions?: string | undefined;
  smokingStatus: YesOrNo;
  alcoholConsumption: YesOrNo;
  tattoos: YesOrNo;
  Vaccinations: YesOrNo;
  donationHistory: YesOrNo;
  lastDonationDate: Date;
  identificationType?: IdentificationType;
  identificationNumber?: string | undefined;
  identificationDocument?: FormData | undefined;
  donationConsent: boolean;
  privacyConsent: boolean;
  disclosureConsent: boolean;
}
