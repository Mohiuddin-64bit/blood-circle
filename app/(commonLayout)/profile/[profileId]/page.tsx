/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { getUser } from "@/lib/actions/user.actions";
import checkUserCookie from "@/lib/checkUser";
import ProfileDetails from "@/components/ProfileDetails";
import { getDonnerById } from "@/lib/actions/donar.action";

export const revalidate = 2;

const MyProfile = async ({ params }: SearchParamProps) => {
  const { profileId } = params;
  const profile = await getDonnerById(profileId);
  const isUserAuthenticated = checkUserCookie();
  const user = await getUser();

  console.log(user);

  return (
    <ProfileDetails
      profile={profile}
      isUserAuthenticated={isUserAuthenticated}
      user={user}
    />
  );
};

export default MyProfile;
