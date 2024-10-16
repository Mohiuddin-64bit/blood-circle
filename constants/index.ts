
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
  birthDate: null as Date | null, 
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
  firstTimeDonor: false,
  lastDonationDate: null, 
  donationHistory: "" as YesOrNo,
  profilePhoto: [],
  donationConsent: false,
  privacyConsent: false,
  disclosureConsent: false,
};

export const StatusIcon = {
  active: "/assets/icons/active.svg",
  inactive: "/assets/icons/inactive.svg",
  unknown: "/assets/icons/inactive.svg",
}
