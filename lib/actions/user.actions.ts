"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ID, Query } from "node-appwrite";
import {
  DATABASE_ID,
  databases,
  DONNER_COLLECTION_ID,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "@/appwrite/config";

// Create APPWRITE ACCOUNT
export const createAccount = async (user: CreateAccountParams) => {
  const { account } = await createAdminClient();
  try {
    const newUser = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    loginAccount({ email: user.email, password: user.password });

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
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );

    cookies().set("session", session.secret, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(session.expire),
      path: "/",
    });
    return parseStringify(session);
  } catch (error: any) {
    console.error("An error occurred while fetching user:", error);
  }
};

// Logout APPWRITE Account
export const logoutAccount = async () => {
  const session = cookies().get("session") as any;
  const { account } = await createSessionClient(session.value);
  try {
    const logoutUser = await account.deleteSession("current");
    cookies().delete("session");
    return parseStringify(logoutUser);
  } catch (error: any) {
    console.error("An error occurred while fetching user:", error);
  }
};

// GET APPWRITE ACCOUNT
export const getUser = async () => {
  const session = cookies().get("session") as any;
  const { account } = await createSessionClient(session?.value);
  try {
    const user = await account.get();
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
