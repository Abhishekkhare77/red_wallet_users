import React from "react";
import Sidbar from "@/app/components/Sidbar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Page = () => {
  return (
    <div className="min-h-[100vh]">
     <Navbar />
     <Sidbar />

      <div className="pt-20  ">
        <div className="w-[400px] m-auto rounded border-2 border-white my-10 px-8 py-10">
          <div className="flex flex-col">
            <h1 className="text-white text-lg">Change Email</h1>
            <input
              name="email"
              placeholder="Enter Email"
              className="border rounded h-10 w-full px-2 text-sm  placeholder:text-white text-white bg-[#373737] mt-3"
            />
            <input
              name="email"
              placeholder="Enter New Email"
              className="border rounded h-10 w-full px-2 text-sm  placeholder:text-white text-white bg-[#373737] mt-3"
            />
            <button className="text-white w-full rounded border border-white py-1 bg-black hover:bg-gray-900 mt-4">
              Change Email
            </button>
          </div>
          <div className="flex flex-col">
            <h1 className="text-white mt-8 mb-4 text-lg">Change Password</h1>
            <input
              type="password"
              className="border h-10 w-full px-2 text-sm text-white rounded placeholder:text-white bg-[#373737] "
              placeholder="Enter Password"
            />
            <input
              type="password"
              className="border h-10 w-full px-2 text-sm text-white rounded  placeholder:text-white bg-[#373737] mt-3"
              placeholder="Confirm Password"
            />
            <input
              type="password"
              className="border h-10 w-full px-2 text-sm text-white rounded placeholder:text-white  bg-[#373737] mt-3"
              placeholder="Old Password"
            />
            <button className="text-white w-full border rounded border-white py-1 bg-black hover:bg-gray-900 mt-4">
              Change Password
            </button>
          </div>
        </div>
      </div>
     <Footer />
    </div>
  );
};

export default Page;
