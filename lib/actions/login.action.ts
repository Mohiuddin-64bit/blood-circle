"use server";

import { createAdminClient } from "@/appwrite/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createSession(data: LoginAccountParams) {
  const { account } = await createAdminClient();

  const session = await account.createEmailPasswordSession(
    data.email,
    data.password
  );

  cookies().set("session", session.secret, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: new Date(session.expire),
    path: "/",
  });

  redirect("/profile");
}
