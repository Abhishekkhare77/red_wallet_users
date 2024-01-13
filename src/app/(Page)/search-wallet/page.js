"use client";

import React, { useState, useEffect } from "react";
import Sidbar from "@/app/components/Sidbar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { IoSearchSharp } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const [localStorageData, setLocalStorageData] = useState([]);

  // Function to add data to local storage
  const addToLocalStorage = () => {
    if (inputValue.trim() === "") {
      alert("Please enter a value");
      return;
    }

    // Check if the data already exists in local storage
    const existingData = localStorage.getItem("myLocalStorageData"); // ---------------------------------------
    const newData = {
      id: new Date().getTime(),
      value: inputValue,
    };

    if (existingData) {
      const parsedData = JSON.parse(existingData); //---------------------------------------
      const updatedData = [...parsedData, newData]; //-----------------------------------------
      localStorage.setItem("myLocalStorageData", JSON.stringify(updatedData)); //----------------------------------
      setLocalStorageData(updatedData);
    } else {
      const initialData = [newData];
      localStorage.setItem("myLocalStorageData", JSON.stringify(initialData)); //-------------------------------
      setLocalStorageData(initialData);
    }

    setInputValue("");
  };

  // Function to remove data from local storage
  const removeFromLocalStorage = (id) => {
    const existingData = localStorage.getItem("myLocalStorageData");

    if (existingData) {
      const parsedData = JSON.parse(existingData); //-----------------------------------
      const updatedData = parsedData.filter((item) => item.id !== id); //-------------------------------
      localStorage.setItem("myLocalStorageData", JSON.stringify(updatedData)); //----------------------------------
      setLocalStorageData(updatedData);
    }
  };

  useEffect(() => {
    // Retrieve data from local storage when the component mounts
    const existingData = localStorage.getItem("myLocalStorageData");
    if (existingData) {
      const parsedData = JSON.parse(existingData);
      setLocalStorageData(parsedData);
    }
  }, []);

  return (
    <>
      <Navbar />
      <Sidbar>


        <div> 
          <div className="float-right mt-20 mx-3">
            <div className="rounded-full bg-[#373737] h-10 w-10 text-center text-white font-bold text-4xl cursor-pointer">
              ?
            </div>
          </div>
          <div className="flex justify-center pt-10 sm:pt-20 h-[100vh] w-[full]">
            <div className="w-[40%] ">
              <div className="mt-16 w-[100%]">
                <h1 className="text-2xl text-white font-bold text-center">
                  What are you looking for?
                </h1>
                <br />
                <div className="flex items-center gap-3 mt-10">
                  <div className="bg-[#373737] w-[80%] rounded flex items-center pl-2 gap-2">
                    <IoSearchSharp size={24} className="text-white" />
                    <input
                      type="text"
                      value={inputValue}
                      placeholder="Enter wallet address"
                      className="text-white outline-none h-10 w-full bg-[#373737] placeholder:text-gray-400 placeholder:text-lg"
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>
                  <button
                    type="search"
                    className="bg-white text-black rounded w-28 h-10 text-lg"
                    onClick={addToLocalStorage}
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="mt-3 flex flex-col-reverse">
                {localStorageData.map((item) => (
                  <div
                    className="text-white flex justify-center rounded border mt-2 border-white items-center"
                    key={item.id}
                  >
                    <a href="/wallet-history" className="p-3 w-full">
                      {item.value}
                    </a>
                    <button
                      className=" text-red-500/50 hover:text-red-500 transition-all p-3"
                      onClick={() => removeFromLocalStorage(item.id)}
                    >
                      <MdDelete size={24}/>
                    </button>
                    <div className="p-3">
                      <MdArrowOutward size={24}/>
                    </div>
                  </div>
                ))}
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
