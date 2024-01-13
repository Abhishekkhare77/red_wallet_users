"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [userId, setUserId] = useState("");
  const [security, setSecurity] = useState([]);
  const [device, setDevice] = useState("");
  const [browser, setBrowser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const route = useRouter();

  useEffect(() => {
    const storData = localStorage.getItem("user_id");
    setUserId(storData);
    getsSecurityData();
    getDevice();
  }, []);

  const getsSecurityData = () => {
    const options = {
      method: "GET",
      url: "https://ipapi.co/json",
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setSecurity(response?.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getDevice = () => {
    const isMobile =
      /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    setDevice(isMobile ? "Mobile" : "Desktop");

    // Get browser information
    const userAgent = navigator.userAgent;
    const browsers = {
      chrome: /chrome/i.test(userAgent),
      safari: /safari/i.test(userAgent),
      firefox: /firefox/i.test(userAgent),
      edge: /edge/i.test(userAgent),
      opera: /opera/i.test(userAgent),
      ie: /msie|trident/i.test(userAgent),
    };

    const detectedBrowser = Object.keys(browsers).find(
      (browser) => browsers[browser]
    );
    setBrowser(detectedBrowser || "Unknown");
  };

  console.log(device, browser);

  const handlePassword = (e) => {
    e.preventDefault();
    const isValidPassword = validatePassword(newPassword);
    if (isValidPassword) {
      changePassword();
    } else {
      alert(
        "Password must have at least one uppercase letter, one digit, and one special character. Minimum length: 8 characters."
      );
    }
  };

  const validatePassword = (password) => {
    // Add your password validation logic here
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(newPassword);
  };

  const changePassword = () => {
    const options = {
      method: "PATCH",
      url: "https://red.catax.me/user/change/password",
      headers: { "Content-Type": "application/json" },
      data: {
        PassInfo: {
          user_id: userId,
          token: oldPassword,
          password: newPassword,
        },
        security: {
          ip: security?.ip,
          network: security?.network,
          version: security?.version,
          city: security?.city,
          region: security?.region,
          region_code: security?.region_code,
          country: security?.country,
          country_name: security?.country_name,
          postal: security?.postal,
          latitude: security?.latitude,
          longitude: security?.longitude,
          timezone: security?.timezone,
          utc_offset: security?.utc_offset,
          org: security?.org,
          browser: browser,
          platform: device,
        },
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
        route.push("/profile");
      })
      .catch(function (error) {
        console.error(error);
        toast.error(error?.response?.data?.detail,{
          style: {
            borderRadius: '5px',
            background: '#333',
            color: '#fff',
            border:'2px solid white'
          },
        });
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
                  <button
                    onClick={handlePassword}
                    className="bg-black rounded hover:bg-gray-800 w-full mt-10 py-2 border border-white "
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
