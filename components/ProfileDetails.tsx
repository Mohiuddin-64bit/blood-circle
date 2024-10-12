/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { ArrowBigLeft, Pencil } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Modal from "./Modal/Modal";
import Image from "next/image";

const ProfileDetails = ({ profile, isUserAuthenticated, user }: any) => {
  console.log(profile);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container py-5">
      <div className="dot-border rounded-xl max-w-4xl mx-auto">
        <Link href="/donner">
          <div className="dot-border inline-block rounded-full hover:bg-dark-200 transition-all">
            <ArrowBigLeft />
          </div>
        </Link>
        <div className="flex flex-col md:flex-row justify-around items-center py-5">
          <div className="h-52 w-52 dot-border rounded-full flex flex-col justify-center items-center">
            {profile?.profilePhotoUrl ? (
              <Image
                src={profile?.profilePhotoUrl}
                alt="profile"
                width={200}
                height={200}
                className="rounded-full"
              />
            ) : (
              <h1 className="text-6xl font-bold">{profile?.bloodGroup}</h1>
            )}
          </div>
          <div className="text-center md:text-left mt-5 md:mt-0">
            <h1 className="text-3xl font-semibold">
              {profile?.firstName} {profile?.lastName}
            </h1>
            <p className="">{profile?.email}</p>
            <p className="">{profile?.phone}</p>
            <p className="">{profile?.address}</p>
            {isUserAuthenticated && user?.email === profile?.email && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-md mt-1"
              >
                <Pencil size="12px" />
              </button>
            )}
          </div>
        </div>
        {/* Modal for updating profile */}
        <Modal profile={profile} open={isModalOpen} setOpen={setIsModalOpen} />
        <hr className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Personal Information:
            </h2>
            <p>
              <strong>First Name:</strong> {profile?.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {profile?.lastName}
            </p>
            <p>
              <strong>Email:</strong> {profile?.email}
            </p>
            <p>
              <strong>Phone:</strong> {profile?.phone}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {`${new Date(profile?.birthDate).toLocaleDateString()}`}
            </p>
            <p>
              <strong>Gender:</strong> {profile?.gender}
            </p>
            <p>
              <strong>Address:</strong> {profile?.address}
            </p>
            <p>
              <strong>Occupation:</strong> {profile?.occupation}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Health Information:</h2>
            <p>
              <strong>Blood Group:</strong> {profile?.bloodGroup}
            </p>
            <p>
              <strong>Weight:</strong> {profile?.weight}
            </p>
            <p>
              <strong>Height:</strong> {profile?.height}
            </p>
            <p>
              <strong>Allergies:</strong> {profile?.allergies || "N/A"}
            </p>
            <p>
              <strong>Medications:</strong> {profile?.medications || "N/A"}
            </p>
            <p>
              <strong>Medical Conditions:</strong>{" "}
              {profile?.medicalConditions || "N/A"}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Lifestyle:</h2>
            <p>
              <strong>Smoking Status:</strong> {profile?.smokingStatus}
            </p>
            <p>
              <strong>Alcohol Consumption:</strong>{" "}
              {profile?.alcoholConsumption}
            </p>
            <p>
              <strong>Tattoos:</strong> {profile?.tattoos}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              Vaccinations & Donations:
            </h2>
            <p>
              <strong>Vaccinations:</strong> {profile?.vaccinations || "N/A"}
            </p>
            <p>
              <strong>Donation History:</strong> {profile?.donationHistory}
            </p>
            <p>
              <strong>Last Donation Date:</strong>{" "}
              {`${new Date(profile?.lastDonationDate).toLocaleDateString()}`}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Emergency Contact:</h2>
            <p>
              <strong>Contact Name:</strong>{" "}
              {profile?.emergencyContactName || "N/A"}
            </p>
            <p>
              <strong>Contact Number:</strong>{" "}
              {profile?.emergencyContactNumber || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
