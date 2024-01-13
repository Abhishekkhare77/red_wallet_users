"use client";
import axios from "axios";
import React, { suseEffect, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  useEffect(() => {
    const storData = localStorage.getItem("user_id");
    setUserId(storData);
  }, []);

  const changeEmail = () => {
    const options = {
      method: "PATCH",
      url: "https://red.catax.me/user/change/email",
      headers: { "Content-Type": "application/json" },
      data: {
        user_id: userId,
        new_email: newEmail,
        new_password: newPassword,
        old_password: oldPassword,
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
        router.push("/verify-email");
      })
      .catch(function (error) {
        console.error(error);
        toast.error(
          error?.response?.data?.detail?.message || "some error found",{
            style: {
              borderRadius: '5px',
              background: '#333',
              color: '#fff',
              border:'2px solid white'
            },
          }
        );
      });
  };

  console.log(userId, "userId");

  return (
    <div className="w-full bg-black h-[100vh]">
      <section className="pt-10">
        <div className="h-full bg-black">
          <div className="border px-10 py-8 w-80 sm:w-[40%] m-auto text-white  shadow-lg">
            <div className="flex justify-center">
              <h1 className="font-semibold text-lg">Change Email</h1>
            </div>
            <div>
              <div>
                <div className="mt-2 ">
                  <label className="font-semibold text-sm pt-3 ">
                    Enter your new email
                  </label>
                  <input
                    required
                    type="email"
                    name="New Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="New Email"
                    className="border h-10 w-full px-2 text-sm text-white  placeholder-white bg-[#373737]"
                  />
                </div>

                <div className="mt-2">
                  <label className="font-semibold text-sm pt-3 ">
                    New Password:
                  </label>
                  <input
                    type="text"
                    name="Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password"
                    className="border h-10 w-full px-2 text-sm text-white placeholder-white   bg-[#373737]"
                  />
                </div>

                <div className="mt-2">
                  <label className="font-semibold text-sm pt-3 ">
                    Old Password:
                  </label>
                  <input
                    type="text"
                    name="Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Old password"
                    className="border h-10 w-full px-2 text-sm text-white placeholder-white   bg-[#373737]"
                  />
                </div>

                <div className="mt-2">
                  <button
                    onClick={changeEmail}
                    className="bg-black hover:bg-gray-800 rounded w-full mt-10 py-2 border border-white "
                  >
                    <h3 className="text-white">Change Email</h3>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
