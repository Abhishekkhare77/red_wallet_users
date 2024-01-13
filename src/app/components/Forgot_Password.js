"use client";

import React, { useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import VariablesContext from "../provider/VariablesContext";
import toast from "react-hot-toast";

const Forgot_Password = () => {
  const { setUserEmail } = useContext(VariablesContext);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const forgotPassword = () => {
    const options = {
      method: "PATCH",
      url: "https://red.catax.me/user/forgot-password",
      params: { email: email },
    };

    console.log(email);
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
        setEmail("");
        setUserEmail(email);
        router.push("/verify-email");
      })
      .catch(function (error) {
        console.error(error);
        toast.error(error.response.data.detail,{
          style: {
            borderRadius: '5px',
            background: '#333',
            color: '#fff',
            border:'2px solid white'
          },
        });
      });
  };

  return (
    <div>
      <div className="border px-10 py-8 w-80 sm:w-96 text-white shadow-lg">
        <div className="flex justify-center">
          <h1 className="font-semibold text-lg">Forgot Password</h1>
        </div>

        <div>
          <h3 className="font-semibold text-sm mt-5 mb-1">Email</h3>
          <input
            value={email}
            type="email"
            id="emailSignIn"
            placeholder="Enter your Email"
            className="border h-10 w-full px-2 text-sm text-white  bg-[#373737] placeholder:text-white"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <button
            className="bg-black hover:bg-gray-900 text-white w-full mt-6 py-2 rounded"
            onClick={forgotPassword}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forgot_Password;
