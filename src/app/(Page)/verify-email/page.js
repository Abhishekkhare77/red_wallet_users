"use client";

import axios from "axios";
import React, { useContext } from "react";
import { MdEmail } from "react-icons/md";
import VariablesContext from "../../provider/VariablesContext";

const Page = () => {
  const { userEmail } = useContext(VariablesContext);

  const resendToken = () => {
    const options = {
      method: "PATCH",
      url: "https://red.catax.me/user/ev/resend-token",
      params: { email: userEmail },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        alert(response?.data?.message);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <div className="flex flex-col items-center text-white pt-20 h-[100vh] ">
      <div className="my-10">
        <div className="border-2 border-white p-3 rounded-full bg-green-100 shadow">
          <MdEmail size={25} color="green" />
        </div>
      </div>
      <div className="flex items-center flex-col gap-2">
        <h2 className="text-3xl font-semibold">Please verify your mail</h2>
        <p>You are almost there , we sent an mail to </p>
        <p className="font-bold">{userEmail}</p>
      </div>
      <div className="mt-10">
        <button onClick={resendToken} className="bg-gray-700 px-4 py-2 rounded">
          <h3 className="text-white text-sm">
            {" "}
            Resend verification Email. DEV Ye button working nahi hai abhi
          </h3>
        </button>
      </div>
    </div>
  );
};

export default Page;
