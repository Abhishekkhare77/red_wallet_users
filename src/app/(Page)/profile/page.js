"use client";

import React, { useContext, useEffect, useState } from "react";
import Sidbar from "@/app/components/Sidbar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import Link from "next/link";

const Page = () => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const storData = localStorage.getItem("user_id");
    setUserId(storData);
    getUserData(storData);
  }, []);

  const getUserData = (id) => {
    const options = {
      method: "GET",
      url: "https://red.catax.me/user/profile",
      params: { user_id: id },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setUserData(response?.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  if (!userData) {
    return (
      <div className="flex flex-col items-center pt-40  h-[100vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    );
  }

  console.log(userId, "userId");
  return (
    <>
      <Navbar />
      <Sidbar>
        <div className="min-h-[100vh] text-white">
          <div className="  pt-20  px-5  pb-10">
            <div className=" flex items-center justify-center gap-5">
              <Link href="/profile-update" className="">
                <p className="w-32 border border-white text-center p-2">
                  Update Profile
                </p>
              </Link>
              <Link href="/change-email" className="">
                <p className="w-32 border border-white text-center p-2">
                  Change Email
                </p>
              </Link>
              <Link href="/change-password" className="">
                <p className="w-40 border border-white text-center p-2">
                  Change Password
                </p>
              </Link>
            </div>
            <div className="flex  flex-col items-center justify-center mt-10">
              <div className=" ">
                <h1 className=" text-xl mt-3 mb-5 underline text-center">
                  User Data
                </h1>
                <div className="flex gap-10">
                  <div className="">
                    <div>
                      <p className="text-sm text-gray-400">First Name</p>
                      <h1 className="text-lg mb-2">
                        {userData?.user_first_name || "Unknown"}
                      </h1>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Last Name</p>
                      <h1 className="text-lg mb-2">
                        {userData?.user_last_name || "Unknown"}
                      </h1>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <h1 className="text-lg mb-2">
                        {userData?.user_email || "Unknown"}
                      </h1>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Mobile Number</p>
                      <h1 className="text-lg mb-2">
                        {userData?.user_mobile_number || "Unknown"}
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p className="text-sm text-gray-400">Designation</p>
                      <h1 className="text-lg mb-2">
                        {userData?.user_designation || "Unknown"}
                      </h1>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Department</p>
                      <h1 className="text-lg mb-2">
                        {userData?.user_department || "Unknown"}
                      </h1>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Registration Category</p>
                      <h1 className="text-lg mb-2">
                        {userData?.registration_category || "Unknown"}
                      </h1>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Country</p>
                      <h1 className="text-lg mb-2">
                        {userData?.user_country || "Unknown"}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex  items-center justify-center mt-10">
                {userData?.org_details && (
                  <div className=" ">
                    <h1 className=" text-xl mb-5 text-center mt-3 underline">
                      Organization Data
                    </h1>
                    <div className=" flex gap-12">
                      <div>
                        <div className="w-44">
                          <p className="text-sm text-gray-400">Name</p>

                          <h1 className="text-lg mb-2">
                            {userData?.org_details?.org_name || "Unknown"}
                          </h1>
                        </div>
                        <div className="w-44">
                          <p className="text-sm text-gray-400">Website</p>
                          <h1 className="text-lg mb-2">
                            {userData?.org_details?.org_website}
                          </h1>
                        </div>
                        <div className="w-44">
                          <p className="text-sm text-gray-400">Country</p>
                          <h1 className="text-lg mb-2">
                            {userData?.org_details?.org_country}
                          </h1>
                        </div>
                        <div className="w-44">
                          <p className="text-sm text-gray-400">State</p>
                          <h1 className="text-lg mb-2">
                            {userData?.org_details?.org_state}
                          </h1>
                        </div>
                        <div className="w-44">
                          <p className="text-sm text-gray-400">City</p>
                          <h1 className="text-lg mb-2">
                            {userData?.org_details?.org_country}
                          </h1>
                        </div>
                      </div>
                      <div>
                        <div className="w-44">
                          <p className="text-sm text-gray-400">Address</p>
                          <h1 className="text-lg mb-2">
                            {userData?.org_details?.org_address}
                          </h1>
                        </div>
                        <div className="w-44">
                          <p className="text-sm text-gray-400">Type</p>
                          <h1 className="text-lg mb-2">Law Enforcement</h1>
                        </div>
                        <div className="w-44">
                          <p className="text-sm text-gray-400">Users</p>
                          <h1 className="text-lg mb-2">Null</h1>
                        </div>
                        <div className="w-44">
                          <p className="text-sm text-gray-400">Approved Api keys</p>
                          <h1 className="text-lg mb-2">10000</h1>
                        </div>
                        <div className="w-44">
                          <p className="text-sm text-gray-400">Used Api key</p>
                          <h1 className="text-lg mb-2">4000</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Sidbar>
    </>
  );
};

export default Page;
