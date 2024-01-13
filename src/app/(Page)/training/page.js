/* eslint-disable @next/next/no-img-element */
import React from "react";
import Sidbar from "@/app/components/Sidbar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Page = () => {
  return (
    <>
      <Navbar />
      <Sidbar >
        <div className="min-h-[100vh]">

          <div className="pt-20 flex justify-center">
            <img
              src="https://res.cloudinary.com/dm3lb4pob/image/upload/v1701071760/Aman/comming_soon_bpe1dv.png"
              alt=""
              className=""
            />
          </div>
          <Footer />
        </div>
      </Sidbar>
    </>
  );
};

export default Page;
