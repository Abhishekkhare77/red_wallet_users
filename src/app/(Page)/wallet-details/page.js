"use client";

import React from "react";
import Sidbar from "@/app/components/Sidbar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { BsCurrencyBitcoin } from "react-icons/bs";
import Link from "next/link";

const Page = () => {
  const data = [
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
  const handleLinkClick = (name) => {
    localStorage.setItem("Placeholder", name); // Set the name in localStorage
  };

  return (
    <>
      <Navbar />
      <Sidbar>
        <div className="">

          <div className="float-right mt-20 mx-3 pr-2">
            <button className="rounded-full bg-[#373737] h-10 w-10 text-center text-white font-bold text-4xl cursor-pointer">
              ?
            </button>
          </div>
          <div className="min-h-[100vh] pt-16 mb-16">
            <div className="">
              <h1 className="text-white flex items-center mt-7 ml-8 text-2xl">
                <BsCurrencyBitcoin className="rounded-full bg-yellow-600 text-white p-1 text-4xl mr-2" />
                1bTc3HthkcGh5jkuhjb67876bhhjg766tgkgfFTh
              </h1>
            </div>
            <div className="flex justify-between text-white w-[90%] m-auto pt-16">
              <div className="w-[60%]">
                <h1 className="text-3xl mb-7">Chain:BlockChain</h1>
                <h2 className="text-2xl mb-2 font-light">Wallet Status : Active</h2>
                <h2 className="text-2xl mb-2 font-light">
                  Birth Date : 13/10/2024
                </h2>
                <h2 className="text-2xl mb-2 font-light">
                  Last Active on : 11/12/20000
                </h2>
                <h2 className="text-2xl mb-2 font-light">
                  Total Transaction : 500
                </h2>
                <h2 className="text-2xl mb-2 font-light">
                  Deposit Transaction : 300
                </h2>
                <h2 className="text-2xl mb-2 font-light">
                  Total Received : 140 Bitcoins
                </h2>
                <h2 className="text-2xl mb-2 font-light">
                  Withdrawal Transaction : 200
                </h2>
                <h2 className="text-2xl mb-2 font-light">
                  Total Sent : 120 Bitcoin
                </h2>
                <h2 className="text-2xl mb-2 font-light">Stash : 20 Bitcoins</h2>
                <h2 className="text-2xl mb-2 font-light">
                  Type : Non-KYC, Unknown, Exchange
                </h2>
                <h2 className="text-2xl mb-2 font-light">
                  Alias Wallet : List of wallets
                </h2>
                <h2 className="text-2xl mb-2 font-light">
                  Total Value Received : 50,00,000 INR
                </h2>
                <h2 className="text-2xl mb-2 font-light">
                  Total Value Sent : 70,00,000
                </h2>
                <h2 className="text-2xl mb-2 font-light">
                  Current Balance : 30,000 INR (20 Bitcoins @15,000/BTC)
                </h2>
              </div>
              <div className="w-[30%] flex flex-col text-2xl gap-3">
                {data.map((item) => (
                  <div className="flex flex-col gap-3" key={item.id}>
                    <Link
                      href="/create-new-request"
                      onClick={() => handleLinkClick(item.name)}
                      className=" text-center border border-white p-4 hover:border-red-500 cursor-pointer bg-[#131417]"
                    >
                      {item.name}
                    </Link>
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
