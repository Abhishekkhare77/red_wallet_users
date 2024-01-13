import React from "react";
import Sidbar from "@/app/components/Sidbar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import D3TreeChart from "@/app/components/D3TreeChart"
const Page = () => {
  return (
    <div className="min-h-[100vh] cursor-grab">
     <Navbar />
     <Sidbar/>
      <div>
        <D3TreeChart/>
      </div>
    </div>
  );
};

export default Page;
