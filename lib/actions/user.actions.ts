"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Account, Client, ID, Query } from "node-appwrite";
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
import { cookies } from "next/headers";

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
    // // Check existing user
    // if (error && error?.code === 409) {
    //   const existingUser = await users.list([
    //     Query.equal("email", [user.email]),
    //   ]);
    //   return existingUser.users[0];
    // }
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
      user.name
    );

    const loginUser = await loginAccount({
      email: user.email,
      password: user.password,
    });

    // Set the user.secret in cookies after login
    if (loginUser) {
      cookies().set("session", loginUser.secret, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
    }

    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      return { message: "User already exists" };
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

// Login APPWRITE ACCOUNT
export const loginAccount = async (user: LoginAccountParams) => {
  try {
    const loginUser = await account.createEmailPasswordSession(
      user.email,
      user.password
    );

    // Set the user.secret in cookies
    cookies().set("session", loginUser.secret, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return parseStringify(loginUser);
  } catch (error: any) {
    console.error("An error occurred while fetching user:", error.message);
  }
};

// GET APPWRITE Account
export const getAccount = async () => {
  const client = new Client().setEndpoint(ENDPOINT!).setProject(PROJECT_ID!);

  const account = new Account(client);
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
