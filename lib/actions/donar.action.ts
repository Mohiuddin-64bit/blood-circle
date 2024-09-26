"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  DONNER_COLLECTION_ID,
  ENDPOINT,
  PROJECT_ID,
  storage,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";


// Get APPWRITE Donner
export const getDonner = async (userId: string) => {
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
  identificationDocument,
  ...donner
}: RegisterDonnerParams) => {
  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newDonner = await databases.createDocument(
      DATABASE_ID!,
      DONNER_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
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

// Get Recent Donner List
export const getRecentDonnerList = async () => {
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

// Get Donner By Id
export const getDonnerById = async (donarId: string) => {
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

export const updateDonnerInfo = async (donnerId: string, donner: any) => {
  try {
    const updatedDonner = await databases.updateDocument(
      DATABASE_ID!,
      DONNER_COLLECTION_ID!,
      donnerId,
      donner
    );
    return parseStringify(updatedDonner);
  } catch (error: any) {
    console.error("An error occurred while updating donner:", error);
  }
}