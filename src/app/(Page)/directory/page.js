import React from "react";
import Sidbar from "@/app/components/Sidbar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Page = () => {
  return (
    <>
      <Navbar />
      <Sidbar>
        <div className="min-h-[100vh]">

          <div className="pt-20 flex justify-center">
            <h1 className="text-white text-xl">This is Directory page</h1>
          </div>
          <Footer />
        </div>
      </Sidbar>
    </>
  );
};

export default Page;
