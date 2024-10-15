"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ID } from "node-appwrite";
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

    await loginAccount({ email: user.email, password: user.password });

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

// Password Recovery
export const passwordRecovery = async (values : any) => {
  const { account } = await createAdminClient();
  try {
    const recovery = await account.createRecovery(values.email, values.url);
    return parseStringify(recovery);
  } catch (error: any) {
    console.error("An error occurred while fetching user:", error);
  }
};

// Update Recovery password
export const updateRecoveryPassword = async (values : any) => {
  const { account } = await createAdminClient();
  try {
    const recovery = await account.updateRecovery(values.userId, values.secret, values.newPassword);
    return parseStringify(recovery);
  } catch (error: any) {
    console.error("An error occurred while fetching user:", error);
  }
};
