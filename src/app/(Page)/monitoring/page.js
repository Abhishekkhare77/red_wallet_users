import React from "react";
import Sidbar from "@/app/components/Sidbar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Page = () => {
  return (
    <>
      <Navbar />
      <Sidbar>
        <div>
          <h1 className="text-2xl text-white font-bold text-center pt-20">
            Monitoring
          </h1>
          <Footer />
        </div>
      </Sidbar>
    </>
  );
};

export default Page;
