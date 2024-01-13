"use client";

import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storData = localStorage.getItem("user_id");
    setUserId(storData);
    getUser(storData);
  }, [userId]);

  const getUser = (id) => {
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
        if (response.data.org_details) {
          router.push("/");
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const cancelRequest = () => {
    const options = {
      method: "DELETE",
      url: "https://red.catax.me/user/requests/cancel",
      params: { user_id: userId, request_id: userData?.request_details?._id },
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
        router.push("/search-organization");
      })
      .catch(function (error) {
        console.error(error);
        toast.error(error?.response?.detail,{
          style: {
            borderRadius: '5px',
            background: '#333',
            color: '#fff',
            border:'2px solid white'
          },
        });
      });
  };

  console.log(userData);
  console.log(userId, "userId");

  const handleDeleteConfirmation = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel request?"
    );

    if (isConfirmed) {
      cancelRequest();
    } else {
      console.log("User canceled");
    }
  };

  if (!userData) {
    return (
      <div className="flex flex-col items-center pt-40  h-[100vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    );
  }

  return (
    <div className="">
      <div
        style={{
          // backgroundImage: `url(${backgroundImg.src})`,
          backgroundSize: "200%", // Resize the image to 150% of its original size
          backgroundRepeat: "repeat",
        }}
        className="flex justify-center  min-h-[100vh] "
      >
        <div className="mt-20 flex text-white gap-10 flex-col items-center justify-center">
          {userData?.request_details?.request_status == "pending" && (
            <div>
              <div className="flex flex-col justify-center gap-5">
                <h1>Your organization request is pending </h1>
                <h1>
                  For any query contact with{" "}
                  <Link className="text-blue-500" href="">
                    gev_gaurav@gmail.com
                  </Link>{" "}
                </h1>
                <Link href="/login" className="border p-2 text-center ">
                  Log Out
                </Link>
                <button className="text-sm" onClick={handleDeleteConfirmation}>
                  Delete request
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
