import { cookies } from "next/headers";

export default function checkUserCookie() {
  const cookie = cookies();
  const userCookie = cookie.get("session");
  return userCookie ? true : false;
}
