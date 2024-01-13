"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import VariablesContext from "../../../../../provider/VariablesContext";
import toast from "react-hot-toast";

const Page = () => {
  const [security, setSecurity] = useState([]);
  const [device, setDevice] = useState("");
  const [browser, setBrowser] = useState("");
  const router = useRouter();

  const { setUserId, setUserToken } = useContext(VariablesContext);

  useEffect(() => {
    getsSecurityData();
    getDevice();
    const currentURL = window.location.href;

    const match = currentURL.match(/\/user\/verify\/([^/]+)\/([^/]+)/);

    const extractedUserId = match[1];
    const extractedToken = match[2];
    setUserId(extractedUserId);
    setUserToken(extractedToken);

    const options = {
      method: "GET",
      url: `https://red.catax.me/user/verify/${extractedUserId}/${extractedToken}`,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        if (response.data.redirect === "/home") {
          router.push("/");
          toast.success("Login successful",{
            style: {
              borderRadius: '5px',
              background: '#333',
              color: '#fff',
              border:'2px solid white'
            },
          });
        }
        if (response.data.redirect === "/set-password") {
          router.push("/setpassword");
          toast.success("Set password",{
            style: {
              borderRadius: '5px',
              background: '#333',
              color: '#fff',
              border:'2px solid white'
            },
          });
        }
        if (response.data.redirect === "/set-email") {
          const options = {
            method: "PATCH",
            url: "https://red.catax.me/user/set-email",
            params: { user_id: extractedUserId, token: extractedToken },
            headers: { "Content-Type": "application/json" },
            data: {
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
          };

          axios
            .request(options)
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.error(error);
            });

          router.push("/login");
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [router]);

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

  console.log(security);
  console.log(browser, device);

  return (
    <div className="flex flex-col items-center justify-center  h-[100vh] text-white ">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 "></div>
      <div className="flex items-center flex-col gap-2">
        <p>You are almost there</p>
      </div>
    </div>
  );
};

export default Page;
