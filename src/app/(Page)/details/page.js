"use client";

import React, { useState } from "react";
import Sidbar from "@/app/components/Sidbar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdOutlineArrowDropUp } from "react-icons/md";
const data = [
  {
    p1: "What is ActiveCampaing?",
    p2: " Lorem ipsum dolor sit amet consectetur adipisicin Quia eligendi exercitationem doloribus quis ad ut perferendis. Eius, eveniet similique labore laboriosam accusamus qui repellat adipisci, ex facere, explicabo pariatur rerum.",
  },
];

const Page = () => {
  const [question1, setQuestion1] = useState(false);
  const [question2, setQuestion2] = useState(false);
  const [question3, setQuestion3] = useState(false);
  const [question4, setQuestion4] = useState(false);
  const [question5, setQuestion5] = useState(false);
  const [question6, setQuestion6] = useState(false);

  return (
    <>
      <Navbar /> 
      <Sidbar>

      <div className="min-h-[100vh]">
        <div className="pt-20 mb-10">
          <div className="text-white ">
            <h1 className="text-5xl text-center mb-16 mt-5">
              Frequently Asked Questions
            </h1>
            <div className="w-[80%] m-auto">
              <hr />
              <div className="first-letter:w-full py-3">
                <button
                  className={`flex justify-between items-center py-2 w-full ${
                    question1 ? "bg-gray-400 text-black" : ""
                  } `}
                  onClick={() => setQuestion1(!question1)}
                >
                  <p className="text-lg font-semibold ">
                    What is ActiveCampaing?
                  </p>
                  {question1 ? (
                    <MdOutlineArrowDropUp className="text-3xl " />
                  ) : (
                    <MdOutlineArrowDropDown className="text-3xl " />
                  )}
                </button>
                {question1 ? (
                  <div className="mt-2">
                    <p className="">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quia eligendi exercitationem doloribus quis ad ut
                      perferendis. Eius, eveniet similique labore laboriosam
                      accusamus qui repellat adipisci, ex facere, explicabo
                      pariatur rerum.
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <hr />
              <div className="w-full py-3">
                <button
                  className={`flex justify-between items-center py-2 w-full ${
                    question2 ? "bg-gray-400 text-black" : ""
                  } `}
                  onClick={() => setQuestion2(!question2)}
                >
                  <p className="text-lg font-semibold">What is ActiveCampaing?</p>
                  {question2 ? (
                    <MdOutlineArrowDropUp className="text-3xl " />
                  ) : (
                    <MdOutlineArrowDropDown className="text-3xl " />
                  )}
                </button>
                {question2 ? (
                  <div className="mt-2">
                    <p className="">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quia eligendi exercitationem doloribus quis ad ut
                      perferendis. Eius, eveniet similique labore laboriosam
                      accusamus qui repellat adipisci, ex facere, explicabo
                      pariatur rerum.
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <hr />
              <div className="w-full py-3">
                <button
                  className={`flex justify-between items-center py-2 w-full ${
                    question3 ? "bg-gray-400 text-black" : ""
                  } `}
                  onClick={() => setQuestion3(!question3)}
                >
                  <p className="text-lg font-semibold">What is ActiveCampaing?</p>
                  {question3 ? (
                    <MdOutlineArrowDropUp className="text-3xl " />
                  ) : (
                    <MdOutlineArrowDropDown className="text-3xl " />
                  )}
                </button>
                {question3 ? (
                  <div className="mt-2">
                    <p className="">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quia eligendi exercitationem doloribus quis ad ut
                      perferendis. Eius, eveniet similique labore laboriosam
                      accusamus qui repellat adipisci, ex facere, explicabo
                      pariatur rerum.
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <hr />
              <div className="w-full py-3">
                <button
                  className={`flex justify-between items-center py-2 w-full ${
                    question4 ? "bg-gray-400 text-black" : ""
                  } `}
                  onClick={() => setQuestion4(!question4)}
                >
                  <p className="text-lg font-semibold">What is ActiveCampaing?</p>
                  {question4 ? (
                    <MdOutlineArrowDropUp className="text-3xl " />
                  ) : (
                    <MdOutlineArrowDropDown className="text-3xl " />
                  )}
                </button>
                {question4 ? (
                  <div className="mt-2">
                    <p className="">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quia eligendi exercitationem doloribus quis ad ut
                      perferendis. Eius, eveniet similique labore laboriosam
                      accusamus qui repellat adipisci, ex facere, explicabo
                      pariatur rerum.
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <hr />
              <div className="w-full py-3">
                <button
                  className={`flex justify-between items-center py-2 w-full ${
                    question5 ? "bg-gray-400 text-black" : ""
                  } `}
                  onClick={() => setQuestion5(!question5)}
                >
                  <p className="text-lg font-semibold">What is ActiveCampaing?</p>
                  {question5 ? (
                    <MdOutlineArrowDropUp className="text-3xl " />
                  ) : (
                    <MdOutlineArrowDropDown className="text-3xl " />
                  )}
                </button>
                {question5 ? (
                  <div className="mt-2">
                    <p className="">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quia eligendi exercitationem doloribus quis ad ut
                      perferendis. Eius, eveniet similique labore laboriosam
                      accusamus qui repellat adipisci, ex facere, explicabo
                      pariatur rerum.
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <hr />
              <div className="w-full py-3">
                <button
                  className={`flex justify-between items-center py-2 w-full ${
                    question6 ? "bg-gray-400 text-black" : ""
                  } `}
                  onClick={() => setQuestion6(!question6)}
                >
                  <p className="text-lg font-semibold">What is ActiveCampaing?</p>
                  {question6 ? (
                    <MdOutlineArrowDropUp className="text-3xl " />
                  ) : (
                    <MdOutlineArrowDropDown className="text-3xl " />
                  )}
                </button>
                {question6 ? (
                  <div className="mt-2">
                    <p className="">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quia eligendi exercitationem doloribus quis ad ut
                      perferendis. Eius, eveniet similique labore laboriosam
                      accusamus qui repellat adipisci, ex facere, explicabo
                      pariatur rerum.
                    </p>
                  </div>
                ) : (
                  ""
                )}
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
