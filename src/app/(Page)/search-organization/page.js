import React from "react";
import Organization from "../../components/Search-Organization";
import Sidbar from "@/app/components/Sidbar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Page = () => {
  return (
    <div
      style={{
        fontFamily: "catax",
        // backgroundImage: `url(${backgroundImg.src})`,
        backgroundSize: "200%", // Resize the image to 150% of its original size
        backgroundRepeat: "repeat",
      }}
    >
      <div className="flex justify-center pt-10 sm:pt-20 min-h-[100vh] pb-20 ">
        <Organization />
      </div>
    </div>
  );
};

export default Page;
