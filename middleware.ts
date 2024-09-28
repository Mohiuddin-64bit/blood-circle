/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function middleware(req:any) {
  console.log("Request URL");
  const user = false;
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/myProfile"],
};
