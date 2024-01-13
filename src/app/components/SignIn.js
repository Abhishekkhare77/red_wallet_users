"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [security, setSecurity] = useState([]);
  const [device, setDevice] = useState("");
  const [browser, setBrowser] = useState("");

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

  console.log(email);
  console.log(password);
  const handelLogin = () => {
    if (!email || !password) {
      toast.error('Please fill all details!',
        {
          style: {
            borderRadius: '5px',
            background: '#333',
            color: '#fff',
            border:'2px solid white'
          },
        }
      );
      return;
    }
    const options = {
      method: "POST",
      url: "https://red.catax.me/user/login",
      headers: { "Content-Type": "application/json" },
      data: {
        loginInfo: { credential: email, password: password },
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

  console.log("");

  return (
    <div>
      <div className="border rounded px-10 py-8 w-80 sm:w-96 text-white">
        <div className="flex justify-center">
          <h1 className="font-semibold text-lg">Sign in to your account</h1>
        </div>

        <div>
          <h3 className="font-semibold text-sm mt-5 mb-1">Email</h3>
          <input
            value={email}
            type="email"
            id="emailSignIn"
            placeholder="Enter your Email"
            className="border rounded h-10 w-full px-2 text-sm text-white  bg-[#373737] placeholder:text-white"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <h3 className="font-semibold text-sm mt-2 mb-1">Password</h3>
          <div className="relative">
            <input
              value={password}
              name="password"
              placeholder="Password"
              className="border rounded h-10 w-full px-2 text-sm text-white  bg-[#373737] placeholder:text-white"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="bg-black border hover:bg-slate-900 text-white w-full mt-6 py-2 rounded"
            onClick={handelLogin}
          >
            Login
          </button>
        </div>

        <div className=" flex justify-between pt-4 text-sm cursor-pointer  ">
          <a href="/register" className="hover:underline">
            Register
          </a>

          <a href="/forgot-password" className="hover:underline">
            Forgot Password
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
