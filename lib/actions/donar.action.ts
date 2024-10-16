"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  // databases,
  DONNER_COLLECTION_ID,
  ENDPOINT,
  PROJECT_ID,
  storage,
} from "../appwrite.config";
import { calculateStatus, parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";
import { createAdminClient } from "@/appwrite/config";

// Get APPWRITE Donner
export const getDonner = async (userId: string) => {
  const { databases } = await createAdminClient();
  try {
    const donner = await databases.listDocuments(
      DATABASE_ID!,
      DONNER_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );
    return parseStringify(donner.documents[0]);
  } catch (error: any) {
    console.error("An error occurred while fetching user:", error);
  }
};

// register Donner
export const registerDonner = async ({
  profilePhoto,
  ...donner
}: RegisterDonnerParams) => {
  const { databases } = await createAdminClient();

  try {
    let file;
    if (profilePhoto) {
      const inputFile = InputFile.fromBuffer(
        profilePhoto?.get("blobFile") as Blob,
        profilePhoto?.get("fileName") as string
      );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newDonner = await databases.createDocument(
      DATABASE_ID!,
      DONNER_COLLECTION_ID!,
      ID.unique(),
      {
        profilePhotoId: file?.$id ? file.$id : null,
        profilePhotoUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
          : null,
        ...donner,
      }
    );
    return parseStringify(newDonner);
  } catch (error: any) {
    console.error("An error occurred while registering donner:", error);
  }
};

// update Donner
export const updateDonner = async (
  documentId: string,
  { profilePhoto, ...updatedDonnerData }: Partial<RegisterDonnerParams>
) => {
  const { databases } = await createAdminClient();

  try {
    let file;
    if (profilePhoto) {
      const inputFile = InputFile.fromBuffer(
        profilePhoto?.get("blobFile") as Blob,
        profilePhoto?.get("fileName") as string
      );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const updatedDonner = await databases.updateDocument(
      DATABASE_ID!,
      DONNER_COLLECTION_ID!,
      documentId, // The document ID of the donor to update
      {
        profilePhotoId: file?.$id ? file.$id : null,
        profilePhotoUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
          : null,
        ...updatedDonnerData, // Spread the updated data
      }
    );
    return parseStringify(updatedDonner);
  } catch (error: any) {
    console.error("An error occurred while updating donner:", error);
  }
};

// Get Recent Donner List
export const getRecentDonnerList = async () => {
  const { databases } = await createAdminClient();

  try {
    const recentDonnerList = await databases.listDocuments(
      DATABASE_ID!,
      DONNER_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );
    return parseStringify(recentDonnerList);
  } catch (error: any) {
    console.error(
      "An error occurred while fetching recent donner list:",
      error
    );
  }
};

export const getDonorStatusCounts = async () => {
  const donors = await getRecentDonnerList();
  let activeCount = 0;
  let inactiveCount = 0;
  donors?.documents.forEach((donor: RegisterDonnerParams) => {
    const status = donor.lastDonationDate
      ? calculateStatus(donor.lastDonationDate, donor.gender)
      : "active";
    if (status === "active") {
      activeCount++;
    } else {
      inactiveCount++;
    }
  });

  return { activeCount, inactiveCount, total: donors?.documents.length };
};

// Get Donner By Id
export const getDonnerById = async (donarId: string) => {
  const { databases } = await createAdminClient();

  try {
    const donner = await databases.getDocument(
      DATABASE_ID!,
      DONNER_COLLECTION_ID!,
      donarId
    );
    return parseStringify(donner);
  } catch (error: any) {
    console.error("An error occurred while fetching donner:", error);
  }
};

// get donner by userId
export const getDonnerByUserId = async (userId: string) => {
  const { databases } = await createAdminClient();

  try {
    const donner = await databases.listDocuments(
      DATABASE_ID!,
      DONNER_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );
    return parseStringify(donner);
  } catch (error: any) {
    console.error("An error occurred while fetching donner:", error);
  }
};

// get donner by email
export const getDonnerByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  try {
    const donner = await databases.listDocuments(
      DATABASE_ID!,
      DONNER_COLLECTION_ID!,
      [Query.equal("email", email)]
    );
    return parseStringify(donner);
  } catch (error: any) {
    console.error("An error occurred while fetching donner:", error);
  }
};
