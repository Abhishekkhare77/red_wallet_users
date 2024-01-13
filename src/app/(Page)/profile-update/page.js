"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const category = [
  { label: "Category1", value: "Category1" },
  { label: "Category2", value: "Category2" },
  { label: "Category 3", value: "Category 3" },
  { label: "Category 4", value: "Category 4" },
  { label: "Category 5", value: "Category 5" },
];
const interest1 = [
  { label: "Wallet Search", value: "Wallet Search" },
  { label: "Track Funds", value: "Track Funds" },
  { label: "Compliance", value: "Compliance" },
  { label: "Notice", value: "Notice " },
  { label: "Investigations", value: "Investigations" },
  { label: "Partnership", value: "Partnership" },
  { label: "RWIX", value: "RWIX" },
  { label: "Others", value: "Others" },
];

const Page = () => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState();
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [registration, setRegistration] = useState("");
  const [interests, setInterests] = useState([]);
  const router = useRouter();

  const handleInterestChange = (interest) => {
    // Toggle the selected interest
    setInterests((prevInterests) =>
      prevInterests.includes(interest)
        ? prevInterests.filter((item) => item !== interest)
        : [...prevInterests, interest]
    );
  };

  useEffect(() => {
    const storData = localStorage.getItem("user_id");
    setUserId(storData);
    getProfile(storData);
  }, []);

  const getProfile = (Id) => {
    const options = {
      method: "GET",
      url: "https://red.catax.me/user/profile",
      params: { user_id: Id },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setFirstName(response?.data?.user_first_name);
        setLastName(response?.data?.user_last_name);
        setMobile(response?.data?.user_mobile_number);
        setDesignation(response?.data?.user_designation);
        setDepartment(response?.data?.user_department);
        setRegistration(response?.data?.registration_category);
        setInterests(response?.data?.user_service_interest);
        setUserData(response?.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const updateProfile = () => {
    const options = {
      method: "PUT",
      url: `https://red.catax.me/user/profile/update?user_id=${userId}`,
      headers: { "Content-Type": "application/json" },
      data: {
        user_first_name: firstName,
        user_last_name: lastName,
        user_mobile_number: mobile,
        user_designation: designation,
        user_department: department,
        registration_category: registration,
        user_service_interest: interests,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success(response?.data?.message,{
          style: {
            borderRadius: '5px',
            background: '#333',
            color: '#fff',
            border:'2px solid white'
          },
        });
        getProfile();
        router.push("/profile");
      })
      .catch(function (error) {
        console.error(error.response?.data?.detail);
        toast.error(error.response?.data?.detail,{
          style: {
            borderRadius: '5px',
            background: '#333',
            color: '#fff',
            border:'2px solid white'
          },
        });
      });
  };

  if (!userData) {
    return (
      <div className="flex flex-col items-center pt-40  h-[100vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    );
  }

  console.log(typeof mobile);

  return (
    <div className="w-full min-h-[100vh]">
      <section className="pt-10">
        <div className="h-full">
          <div className="border px-10 py-8 w-80 sm:w-[40%] m-auto text-white  shadow-lg">
            <div className="flex justify-center">
              <h1 className="font-semibold text-lg">Profile Update</h1>
            </div>
            <div>
              <div className="flex gap-5">
                <div>
                  <div className="mt-2 ">
                    <label className="font-semibold text-sm pt-3 ">
                      User First Name:
                    </label>
                    <input
                      required
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      name="First Name"
                      placeholder="First Name"
                      className="border h-10 w-full px-2 text-sm text-white  placeholder-white bg-[#373737]"
                    />
                  </div>

                  <div className="mt-2">
                    <label className="font-semibold text-sm pt-3 ">
                      User Last Name:
                    </label>
                    <input
                      type="text"
                      name="Last Name"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="border h-10 w-full px-2 text-sm text-white placeholder-white   bg-[#373737]"
                    />
                  </div>

                  <div className="mt-2">
                    <label className="font-semibold text-sm pt-3 ">
                      Mobile Number
                    </label>
                    <input
                      name="Contact"
                      id="phoneNumber"
                      placeholder="Mobile Number"
                      value={mobile}
                      onChange={(e) =>
                        setMobile(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      className="border h-10 w-full px-2 text-sm text-white placeholder-white   bg-[#373737]"
                    />
                  </div>
                </div>
                <div>
                  <div className="mt-2">
                    <label className="font-semibold text-sm pt-3 ">
                      Designation
                    </label>
                    <input
                      type="text"
                      name="Designation"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="Designation"
                      className="border h-10 w-full px-2 text-sm text-white placeholder-white   bg-[#373737]"
                    />
                  </div>
                  <div className="mt-2">
                    <label className="font-semibold text-sm pt-3 ">
                      Department:
                    </label>
                    <input
                      type="text"
                      name="Department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="Enter Department"
                      className="border h-10 w-full px-2 text-sm text-white placeholder-white   bg-[#373737]"
                    />
                  </div>
                  <div className="mt-2">
                    <label
                      htmlFor="caseType"
                      className="font-semibold text-sm mt-2 block text-white"
                    >
                      Registration type:
                    </label>
                    <select
                      id="caseType"
                      value={registration}
                      onChange={(e) => setRegistration(e.target.value)}
                      className="border h-10 w-full px-2 text-sm text-white  bg-[#373737]"
                    >
                      {category.map((cat, i) => (
                        <option key={i} value={cat}>
                          {cat?.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className=" mt-2  ">
                <h3 className="font-semibold text-sm my-2 block text-white">
                  Interest
                </h3>
                <div className="grid grid-cols-2 gap-x-14 justify-between">
                  {interest1.map((interest) => (
                    <div
                      key={interest.value}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 bg-black"
                        value={interest.value}
                        checked={interests.includes(interest.value)}
                        onChange={() => handleInterestChange(interest.value)}
                      />
                      <label htmlFor="" className="block text-white">
                        {interest.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-2">
              <button
                onClick={updateProfile}
                className="bg-black hover:bg-gray-800 rounded w-full mt-10 py-2 border border-white "
              >
                <h3 className="text-white">Update</h3>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
