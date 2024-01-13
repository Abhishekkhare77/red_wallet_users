"use client";

import React, { useState } from "react";
import Sidbar from "@/app/components/Sidbar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const Page = () => {
  const [cases, setCases] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const storData = localStorage.getItem("user_id");
      await getUserData(storData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userData?._id && userData?.org_details?._id) {
      getCases();
    }
  }, [userData]);

  const getUserData = async (userID) => {
    const options = {
      method: "GET",
      url: `https://red.catax.me/user/profile?user_id=${userID}`,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setUserData(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCases = () => {
    const options = {
      method: "GET",
      url: `https://red.catax.me/user/cases/all?user_id=${userData?._id}&org_id=${userData?.org_details?._id}`,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setCases(response?.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    console.log("hello");
  };

  console.log(cases);

  return (
    <>
      <Navbar />
      <Sidbar>
        <div className="min-h-[100vh]">
          <div className="pt-20">
            <div className="text-center text-white font-bold text-xl mt-10">
              <Link href="/create-case" className="border p-2 rounded">
                Create Case
              </Link>
            </div>
            <div className="flex items-center text-white justify-center mt-20 gap-5 flex-wrap">
              {cases.map((item) => {
                return (
                  <Link
                    href={`/cases/${item._id}`}
                    key={item._id}
                    className="border rounded hover:bg-gray-800 p-2 flex flex-col items-center"
                  >
                    <h1>{item?.case_type}</h1>
                    <h1>{item?.case_category}</h1>
                    <h1>{item?.case_registration_id}</h1>
                  </Link>
                );
              })}
            </div>
          </div>
          <Footer />
        </div>
      </Sidbar>
    </>
  );
};

export default Page;
