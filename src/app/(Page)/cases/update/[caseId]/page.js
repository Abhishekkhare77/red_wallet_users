"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

const caseTypes = [
  { label: "Type1", value: "Type1" },
  { label: "Type2", value: "Type2" },
  { label: "Type3", value: "Type3" },
  { label: "Type4", value: "Type4" },
];

const caseCategories = [
  { label: "Category1", value: "Category1" },
  { label: "Category2", value: "Category2" },
  { label: "Category3", value: "Category3" },
  { label: "Category4", value: "Category4" },
];

const Page = ({ params }) => {
  const { caseId } = params;
  const [userData, setUserData] = useState([]);
  const [caseData, setCaseData] = useState();
  const [caseType, setCaseType] = useState("");
  const [caseCategory, setCaseCategory] = useState("");
  const [caseRegId, setCaseRegId] = useState("");
  const [caseStatus, setCaseStatus] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storData = localStorage.getItem("user_id");
    setUserId(storData);
    getCase();
  }, []);

  const getCase = () => {
    const options = {
      method: "GET",
      url: `https://red.catax.me/user/case/${caseId}`,
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setCaseType(response?.data?.case_type);
        setCaseCategory(response?.data?.case_category);
        setCaseRegId(response?.data?.case_registration_id);
        setCaseStatus(response?.data?.case_status);
        setCaseData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleUpdate = () => {
    const options = {
      method: "PATCH",
      url: `https://red.catax.me/user/case/update/${caseId}`,
      params: { user_id: userId },
      headers: { "Content-Type": "application/json" },
      data: {
        case_type: caseType,
        case_category: caseCategory,
        case_handled_by: userId,
        case_primary_contact: userId,
        case_secondary_contact: userId,
        case_status: caseStatus,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success(response?.data?.message,{
          style: {
            borderRadius: '5px',
            background: '#333',
            color: '#fff',
            border:'2px solid white'
          },
        });
        getCase();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  console.log(caseId, "case");
  return (
    <div className="h-[100vh]">
      <section className="pt-20">
        <div className=" mb-10 ">
          <div className="h-full">
            <div className="border px-10 py-8 w-80 sm:w-[40%] m-auto text-white  shadow-lg">
              <div className="flex justify-center">
                <h1 className="font-semibold text-lg">Create New Case</h1>
              </div>
              <div>
                <div>
                  <div className="mt-2">
                    <label
                      htmlFor="caseType"
                      className="font-semibold text-sm mt-2 block text-white"
                    >
                      Case Type:
                    </label>
                    <select
                      id="caseType"
                      value={caseType}
                      onChange={(e) => setCaseType(e.target.value)}
                      className="border h-10 w-full px-2 text-sm text-white   bg-[#373737]"
                    >
                      {caseTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-2">
                    <label
                      htmlFor="caseType"
                      className="font-semibold text-sm mt-2 block text-white"
                    >
                      Case Category:
                    </label>
                    <select
                      value={caseCategory}
                      onChange={(e) => setCaseCategory(e.target.value)}
                      id="caseType"
                      className="border h-10 w-full px-2 text-sm text-white  bg-[#373737]"
                    >
                      {caseCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleUpdate}
                    className="bg-black hover:bg-gray-800 rounded w-full mt-10 text-white py-2 "
                  >
                    Create Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
