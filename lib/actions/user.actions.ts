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
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

import { InputFile } from "node-appwrite/file";

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return parseStringify(newUser);
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);
      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

// GET APPWRITE USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error: any) {
    console.error("An error occurred while fetching user:", error);
  }
};

// Get APPWRITE Donner 
export const getDonner = async (userId: string) => {
  try {
    const donner = await databases.listDocuments(
      DATABASE_ID!,
      DONNER_COLLECTION_ID!,
      [
        Query.equal("userId", userId),
      ]
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
  console.log(identificationDocument);
  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    console.log({
      identificationDocumentId: file?.$id ? file.$id : null,
      identificationDocumentUrl: file?.$id
        ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
        : null,
    });

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

