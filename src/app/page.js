"use client";

import Sidbar from "@/app/components/Sidbar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import { useContext, useEffect, useState } from "react";
import VariablesContext from "./provider/VariablesContext";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { setUserId } = useContext(VariablesContext);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const storData = localStorage.getItem("user_id");
    if (storData) {
      setUserId(storData);
      getUserData(storData);
    }
  }, []);
  const getUserData = async (id) => {
    const options = {
      method: "GET",
      url: "https://red.catax.me/user/profile",
      params: { user_id: id },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        if (response?.data?.request_details?.request_status == "pending") {
          router.push("/organizations");
          return;
        }
        if (!response?.data?.org_details) {
          router.push("/search-organization");
          return;
        }
        setUserData(response?.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  if (!userData) {
    return (
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    );
  }
  return (
    <div className="w-full overflow-hidden">
      <Navbar />
      <Sidbar />
      <Dashboard />
      <Footer />
    </div>
  );
}
