import React from "react";
import Pending from "../../components/Pending";
import Sidbar from "@/app/components/Sidbar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Page = () => {
  return (
    <>
      <Navbar />
      <Sidbar>
        <div
          style={{
            fontFamily: "catax",
            // backgroundImage: `url(${backgroundImg.src})`,
            backgroundSize: "200%", // Resize the image to 150% of its original size
            backgroundRepeat: "repeat",
          }}
          className=" pt-10 sm:pt-20 h-[100vh] "
        >


          <div className="flex justify-center items-center">
            <Pending />
          </div>
          <Footer />
        </div>
      </Sidbar>
    </>
  );
};

export default Page;
