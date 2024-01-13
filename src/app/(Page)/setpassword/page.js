"use client";
import React, { useContext, useEffect, useState } from "react";
import VariablesContext from "../../provider/VariablesContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Page = () => {
  const { userId, userToken } = useContext(VariablesContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [security, setSecurity] = useState([]);
  const [device, setDevice] = useState("");
  const [browser, setBrowser] = useState("");
  const router = useRouter();

  useEffect(() => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Please check confirm Password",{
        style: {
          borderRadius: '5px',
          background: '#333',
          color: '#fff',
          border:'2px solid white'
        },
      });
      return;
    }
    const isValidPassword = validatePassword(password);
    if (isValidPassword) {
      setNewPassword();
    } else {
      alert(
        "Password must have at least one uppercase letter, one digit, and one special character. Minimum length: 8 characters."
      );
    }
  };

  const validatePassword = (password) => {
    // Add your password validation logic here
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const setNewPassword = () => {
    const options = {
      method: "PATCH",
      url: "https://red.catax.me/user/set-password",
      headers: { "Content-Type": "application/json" },
      data: {
        passInfo: { user_id: userId, token: userToken, password: password },
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
        router.push("/");
      })
      .catch(function (error) {
        console.error(error?.response?.data?.detail?.message);
        toast.error(error?.response?.data?.detail?.message,{
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
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="border px-10 py-8 w-80 sm:w-96 text-white shadow-lg">
        <div className="flex justify-center">
          <h1 className="font-semibold text-lg">Chang your Password </h1>
        </div>

        <div>
          <h3 className="font-semibold text-sm mt-5 mb-1">New Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="emailSignIn"
            placeholder="Enter New Password"
            className="border h-10 w-full px-2 text-sm text-white  bg-[#373737] placeholder:text-white"
          />
        </div>

        <div>
          <h3 className="font-semibold text-sm mt-2 mb-1">Conform Password</h3>
          <div className="relative">
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="password"
              placeholder="Conform Password"
              className="border h-10 w-full px-2 text-sm text-white  bg-[#373737] placeholder:text-white"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-black hover:bg-gray-800 rounded text-white w-full mt-6 py-2 rounded"
          >
            Set Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
