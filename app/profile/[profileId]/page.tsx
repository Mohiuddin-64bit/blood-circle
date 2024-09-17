/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { ArrowBigLeft, Pencil } from "lucide-react";
import Link from "next/link";

const MyProfile = () => {
  return (
    <div className="container py-5">
      <div className="dot-border rounded-xl max-w-4xl mx-auto">
        <Link href="/">
          <div className="dot-border inline-block rounded-full hover:bg-dark-200 transition-all">
            <ArrowBigLeft />
          </div>
        </Link>
        <div className="flex flex-col md:flex-row justify-around items-center py-5">
          <div className="h-52 w-52 dot-border rounded-full flex flex-col justify-center items-center">
            <h2 className="text-6xl font-bold">O+</h2>
          </div>
          <div className="text-center md:text-left mt-5 md:mt-0">
            <h1 className="text-3xl font-semibold">John Doe</h1>
            <p className="">mohiuddin.niddu@gmail.com</p>
            <p className="">+8801307483244</p>
            <p className="">Dhaka, Bangladesh</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-1">
              <Pencil size="12px" />
            </button>
          </div>
        </div>
        <hr className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Personal Information:
            </h2>
            <p>
              <strong>First Name:</strong> John
            </p>
            <p>
              <strong>Last Name:</strong> Doe
            </p>
            <p>
              <strong>Email:</strong> mohiuddin.niddu@gmail.com
            </p>
            <p>
              <strong>Phone:</strong> +8801307483244
            </p>
            <p>
              <strong>Date of Birth:</strong> 12/01/1990
            </p>
            <p>
              <strong>Gender:</strong> Male
            </p>
            <p>
              <strong>Address:</strong> Dhaka, Bangladesh
            </p>
            <p>
              <strong>Occupation:</strong> Web Developer
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Health Information:</h2>
            <p>
              <strong>Blood Group:</strong> O+
            </p>
            <p>
              <strong>Weight:</strong> 75kg
            </p>
            <p>
              <strong>Height:</strong> 5'9"
            </p>
            <p>
              <strong>Allergies:</strong> None
            </p>
            <p>
              <strong>Medications:</strong> None
            </p>
            <p>
              <strong>Medical Conditions:</strong> None
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Lifestyle:</h2>
            <p>
              <strong>Smoking Status:</strong> Non-Smoker
            </p>
            <p>
              <strong>Alcohol Consumption:</strong> Occasional
            </p>
            <p>
              <strong>Tattoos:</strong> No
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              Vaccinations & Donations:
            </h2>
            <p>
              <strong>Vaccinations:</strong> Fully Vaccinated
            </p>
            <p>
              <strong>Donation History:</strong> 3 donations
            </p>
            <p>
              <strong>Last Donation Date:</strong> 01/06/2024
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Identification:</h2>
            <p>
              <strong>ID Type:</strong> Passport
            </p>
            <p>
              <strong>ID Number:</strong> A123456789
            </p>
            <p>
              <strong>Document:</strong> Uploaded
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Emergency Contact:</h2>
            <p>
              <strong>Contact Name:</strong> Jane Doe
            </p>
            <p>
              <strong>Contact Number:</strong> +8801234567890
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
