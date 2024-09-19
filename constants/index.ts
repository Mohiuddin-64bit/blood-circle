export const GenderOptions = ["Male", "Female", "Other"];

export const YesOrNoOptions = ["Yes", "No"];

export const BloodGroupOptions = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export const identificationTypes = [
  "National ID",
  "Passport",
  "Driver's License",
  "Birth Certificate",
];

export const donnerFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  bloodGroup: "" as BloodGroup,
  weight: "",
  height: "",
  allergies: "",
  medications: "",
  medicalConditions: "",
  smokingStatus: "" as YesOrNo,
  alcoholConsumption: "" as YesOrNo,
  tattoos: "" as YesOrNo,
  Vaccinations: "" as YesOrNo,
  lastDonationDate: new Date(Date.now()),
  IdentificationType: "" as IdentificationType,
  donationHistory: "" as YesOrNo,
  IdentificationNumber: "",
  identificationDocument: [],
  donationConsent: false,
  privacyConsent: false,
  disclosureConsent: false,
};

export const StatusIcon = {
  active: "/assets/icons/active.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
}
