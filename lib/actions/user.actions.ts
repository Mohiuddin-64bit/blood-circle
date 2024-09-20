"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ID, Query } from "node-appwrite";
import {
  account,
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
      user.password,
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

// Create APPWRITE ACCOUNT
export const createAccount = async (user: CreateAccountParams) => {
  try {
    const newUser = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    );

    await loginAccount({
      email: user.email,
      password: user.password
    });

    return parseStringify(newUser);

  } catch (error: any) {
    console.error("An error occurred while creating a new user:", error);
    throw error; // Re-throw the error to handle it further up the call stack if needed
  }
};

// Login APPWRITE ACCOUNT
export const loginAccount = async (user: LoginAccountParams) => {
  try {
    const loginUser = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    console.log(loginUser, "loginUser");
    return parseStringify(loginUser);
  } catch (error: any) {
    console.error("An error occurred while fetching user:", error.message);
  }
};

// GET APPWRITE Account
export const getAccount = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error: any) {
    console.error("An error occurred while fetching user:", error);
  }
};
// Logout APPWRITE Account
export const logoutAccount = async () => {
  try {
    const logoutUser = await account.deleteSession("current");
    return parseStringify(logoutUser);
  } catch (error: any) {
    console.error("An error occurred while fetching user:", error);
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
  console.log(donarId, "adfasdfasdfasfasdflkjadsfkljsadfl");
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
