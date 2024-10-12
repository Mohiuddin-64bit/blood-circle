/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { getDonnerById, getUser } from "@/lib/actions/user.actions";
import checkUserCookie from "@/lib/checkUser";
import ProfileDetails from "@/components/ProfileDetails";

const MyProfile = async ({ params }: SearchParamProps) => {
  const { profileId } = params;
  const profile = await getDonnerById(profileId);
  const isUserAuthenticated = checkUserCookie();
  const user = await getUser();

  return (
    <ProfileDetails
      profile={profile}
      isUserAuthenticated={isUserAuthenticated}
      user={user}
    />
  );
};

export default MyProfile;
