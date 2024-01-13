"use client";
import React, { useEffect, useState } from "react";
import Sidbar from "@/app/components/Sidbar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { MdDelete } from "react-icons/md";

import Link from "next/link";

const drop1 = [
  {
    id: 1,
    name: "Monitring Requset",
  },
  {
    id: 2,
    name: "Request Investingation",
  },
  {
    id: 3,
    name: "Track Proceeds",
  },
  {
    id: 4,
    name: "Track Receivables",
  },
  {
    id: 5,
    name: "Issus Look Out Notice",
  },
  {
    id: 6,
    name: "Search Notice",
  },
  {
    id: 7,
    name: "Dye Proceeds",
  },
  {
    id: 8,
    name: "Flag as Red Wallet",
  },
];

const Page = () => {
  const [selectedOption, setSelectedOption] = useState(""); // State to hold the selected option
  const [inputValue, setInputValue] = useState("");
  const [localStorageData, setLocalStorageData] = useState([]);

  // Function to add data to local storage
  const addToLocalStorage = () => {
    if (inputValue.trim() === "") {
      alert("Please enter a value");
      return;
    }

    // Check if the data already exists in local storage
    const existingData = localStorage.getItem("myRequestLocalStorageData"); // ---------------------------------------
    const newData = {
      id: new Date().getTime(),
      value: inputValue,
    };

    if (existingData) {
      const parsedData = JSON.parse(existingData); //---------------------------------------
      const updatedData = [...parsedData, newData]; //-----------------------------------------
      localStorage.setItem(
        "myRequestLocalStorageData",
        JSON.stringify(updatedData)
      ); //----------------------------------
      setLocalStorageData(updatedData);
    } else {
      const initialData = [newData];
      localStorage.setItem(
        "myRequestLocalStorageData",
        JSON.stringify(initialData)
      ); //-------------------------------
      setLocalStorageData(initialData);
    }

    setInputValue("");
  };

  // Function to remove data from local storage
  const removeFromLocalStorage = (id) => {
    const existingData = localStorage.getItem("myRequestLocalStorageData");

    if (existingData) {
      const parsedData = JSON.parse(existingData); //-----------------------------------
      const updatedData = parsedData.filter((item) => item.id !== id); //-------------------------------
      localStorage.setItem(
        "myRequestLocalStorageData",
        JSON.stringify(updatedData)
      ); //----------------------------------
      setLocalStorageData(updatedData);
    }
  };

  useEffect(() => {
    // Retrieve data from local storage when the component mounts
    const existingData = localStorage.getItem("myRequestLocalStorageData");
    if (existingData) {
      const parsedData = JSON.parse(existingData);
      setLocalStorageData(parsedData);
    }
  }, []);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value); // Update the selected option when the user changes it
  };
  useEffect(() => {
    const storedName = localStorage.getItem("Placeholder");
    if (storedName) {
      // setName(storedName);
      setSelectedOption(storedName);
    }
  }, []);

  return (
    <>
        <Navbar /> 
        <Sidbar>
        <div className="min-h-[100vh]">
          <div className="pt-20">
            <div className="w-[80%] m-auto pb-10">
              <h1 className="text-white text-2xl mt-10 mb-16">New Request</h1>
              <div className=" flex  text-white">
                <div className="w-[50%]">
                  <div className="flex flex-col">
                    <label htmlFor="" className="text-xl mb-2">
                      Request Type
                    </label>
                    <select
                      name=""
                      id=""
                      value={selectedOption} // Set the value of the selected option
                      onChange={handleSelectChange} // Handle changes to the selected option
                      className="text-black py-2 w-[300px] font-medium"
                    >
                      {drop1.map((item) => (
                        <option
                          className="text-black"
                          key={item.id}
                          value={item.name}
                        >
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="" className="text-xl ">
                      Wallet
                    </label>
                    <div className="mt-1">
                      <div className=" ">
                        {/* <div className="bg-[#373737] w-[80%] flex items-center pl-2 gap-2"> */}
                        <input
                          type="text"
                          value={inputValue}
                          className="text-black outline-none h-9 w-[250px] font-medium px-1"
                          onChange={(e) => setInputValue(e.target.value)}
                        />
                        {/* </div> */}
                        <button
                          type="search"
                          className="border px-3 py-1 border-white ml-4"
                          onClick={addToLocalStorage}
                        >
                          +
                        </button>
                      </div>
                      <div className="mt-3 flex flex-col-reverse ">
                        {localStorageData.map((item) => (
                          <div
                            className="
                            flex mt-2 items-center"
                            key={item.id}
                          >
                            <a
                              href="/wallet-history"
                              className=" p-2 w-[250px] border bg-white text-black font-medium  border-white "
                            >
                              {item.value}
                            </a>
                            <button
                              className="
                              text-white px-2 ml-3 py-2 
                                border border-white"
                              onClick={() => removeFromLocalStorage(item.id)}
                            >
                              <MdDelete className="text-xl" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-white flex justify-center border-2 border-white w-[200px] mt-16">
                    <label htmlFor="fileUpload" className="p-3">
                      Upload
                    </label>
                    <input
                      type="file"
                      id="fileUpload"
                      name="fileUpload"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                    />
                  </span>

                  <Link
                    href="sample.pdf"
                    download="sample.pdf"
                    className="text-red-400 flex w-[250px] mt-5  text-xl"
                  >
                    Download sample file
                  </Link>
                </div>

                <div className="w-[50%]">
                  <div className="flex flex-col w-[300px]">
                    <label htmlFor="" className="text-xl mr-3">
                      Case No :
                    </label>
                    <input type="number" className="py-[6px] text-black px-1" />
                  </div>
                  <div className="flex flex-col w-[300px] mt-3">
                    <label htmlFor="" className="text-xl mr-3">
                      FIR No :
                    </label>
                    <input
                      type="number"
                      value="13213434"
                      className="py-[6px] text-black font-medium px-1"
                    />
                  </div>

                  <span className="text-white flex justify-center border-2 border-white w-[200px] mt-12">
                    <label htmlFor="fileUpload" className="p-3">
                      Upload
                    </label>
                    <input
                      type="file"
                      id="fileUpload"
                      name="fileUpload"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                    />
                  </span>

                  <Link
                    href="sample.pdf"
                    download="sample.pdf"
                    className="text-red-400 w-[250px] flex text-xl  mt-5 "
                  >
                    download sample letter
                  </Link>
                  <div className="mt-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 mr-3 cursor-pointer"
                    />
                    <label htmlFor="" className="text-xl">
                      Email Notification
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 mr-3 cursor-pointer"
                    />
                    <label htmlFor="" className="text-xl">
                      Mobile Notification
                    </label>
                  </div>
                  <div className="mt-2 flex flex-col w-[300px]">
                    <label htmlFor="" className="text-xl mb-3">
                      Investigation officer
                    </label>
                    <select
                      name=""
                      id=""
                      className="text-black w-full py-2 font-medium "
                    >
                      <option value="" className="">
                        Police
                      </option>
                      <option value="" className="">
                        pappu
                      </option>
                      <option value="" className="">
                        lappu
                      </option>
                      <option value="" className="">
                        singham
                      </option>
                    </select>
                  </div>
                  <button
                    className="border border-white py-3 w-[200px] mt-4"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
        </Sidbar>
    </>
  );
};

export default Page;
