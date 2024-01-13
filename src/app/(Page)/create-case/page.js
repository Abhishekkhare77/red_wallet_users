"use client";

import React, { useState, useEffect, useContext } from "react";
import Sidbar from "@/app/components/Sidbar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { TbArrowRight } from "react-icons/tb";
import { MdQuestionMark } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
const department = [
  { label: "India", value: "India" },
  { label: "Albania", value: "Albania" },
  { label: "Algeria", value: "Algeria" },
  { label: "Andorra", value: "Andorra" },
  { label: "Angola", value: "Angola" },
];

const createCase = [
  {
    h2: "Monitoring Request",
    p: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, sequi! , ipsum dolor sit amet consectetur adipisicing elit. Pariatur, natus.",
    link: "/create-new-request",
  },
  {
    h2: "Request Investigation",
    p: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, sequi! , ipsum dolor sit amet consectetur adipisicing elit. Pariatur, natus.",
    link: "/create-new-request",
  },
  {
    h2: "Track Proceeds",
    p: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, sequi! , ipsum dolor sit amet consectetur adipisicing elit. Pariatur, natus.",
    link: "/create-new-request",
  },
  {
    h2: "Track Receivables",
    p: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, sequi! , ipsum dolor sit amet consectetur adipisicing elit. Pariatur, natus.",
    link: "/create-new-request",
  },
  {
    h2: "Issus Look Out Notice",
    p: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, sequi! , ipsum dolor sit amet consectetur adipisicing elit. Pariatur, natus.",
    link: "/create-new-request",
  },
  {
    h2: "Search Notice",
    p: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, sequi! , ipsum dolor sit amet consectetur adipisicing elit. Pariatur, natus.",
    link: "/create-new-request",
  },
  {
    h2: "Dye Proceeds",
    p: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, sequi! , ipsum dolor sit amet consectetur adipisicing elit. Pariatur, natus.",
    link: "/create-new-request",
  },
  {
    h2: "Flag as Red Wallet",
    p: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, sequi! , ipsum dolor sit amet consectetur adipisicing elit. Pariatur, natus.",
    link: "/create-new-request",
  },
];

const Page = () => {
  const [handelPages, setHandelPages] = useState(1);
  const [pageOne, setPageOne] = useState("");
  const [pageTwo, setPageTwo] = useState("");
  const [userData, setUserData] = useState([]);
  const [pageThree, setPageThree] = useState("");
  const [caseType, setCaseType] = useState(caseTypes[0]?.value);
  const [caseCategory, setCaseCategory] = useState(caseCategories[0]?.value);
  const [caseRegId, setCaseRegId] = useState("");
  const [bgColor, setBgColor] = useState("bg-red-700");
  const router = useRouter();

  useEffect(() => {
    const storData = localStorage.getItem("user_id");
    getUserData(storData);
  }, []);

  useEffect(() => {
    if (handelPages === 1) {
      setPageOne("");
      setPageTwo("hidden");
      setPageThree("hidden");
    } else if (handelPages === 2) {
      setPageOne("hidden");
      setPageTwo("");
      setPageThree("hidden");
    } else {
      setPageOne("hidden");
      setPageTwo("hidden");
      setPageThree("");
    }
  }, [handelPages]);

  const currDate = new Date();

  const epochTime = currDate.getTime();

  const handleLinkClick = (name) => {
    localStorage.setItem("Placeholder", name); // Set the name in localStorage
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Check the file type
      const allowedFileTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedFileTypes.includes(selectedFile.type)) {
        alert("Please select a PDF, DOC, or DOCX file.");
        return;
      }

      // Check the file size
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      if (selectedFile.size > maxSizeInBytes) {
        alert("File size exceeds 5MB limit.");
        return;
      }

      // You can handle the selected file here (e.g., you can upload it or perform other actions)
    }
  };

  const getUserData = (userID) => {
    const options = {
      method: "GET",
      url: `https://red.catax.me/user/profile?user_id=${userID}`,
      params: { user_id: userID },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setUserData(response?.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const submitCase = () => {
    if (!caseRegId) {
      toast.error("Please fill register Id Field",{
        style: {
          borderRadius: '5px',
          background: '#333',
          color: '#fff',
          border:'2px solid white'
        },
      });
      return;
    }
    const options = {
      method: "POST",
      url: "https://red.catax.me/user/case/create",
      headers: { "Content-Type": "application/json" },
      data: {
        created_by: userData?._id,
        org_id: userData?.org_details?._id,
        case_type: caseType,
        case_category: caseCategory,
        case_registration_id: caseRegId,
        case_registration_date: 170228044,
        case_handled_by: userData?._id,
        case_primary_contact: userData?._id,
        case_secondary_contact: userData?._id,
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
        router.push("/cases");
        setHandelPages(2);
      })
      .catch(function (error) {
        console.error(error);
        toast.error(error?.response?.data?.detail,{
          style: {
            borderRadius: '5px',
            background: '#333',
            color: '#fff',
            border:'2px solid white'
          },
        });
      });
  };

  // console.log(date, "date");
  console.log(epochTime, "ddd");
  console.log(userData, "user_data");
  console.log(userData.org_details?._id, "org_data");

  console.log(caseCategory);

  return (
    <>
      <Navbar />
      <Sidbar>
        <div className="min-h-[100vh]">
          <div className="pt-20 ">
            <div className="sm:w-[530px] m-auto">
              <div className="m-auto  flex items-center px-3">
                <button
                  onClick={() => setHandelPages(1)}
                  className={`w-[35px] h-[35px] rounded-full bg-red-700  ${
                    handelPages === 1 ? bgColor : ""
                  }`}
                ></button>

                <div
                  className={`w-[200px] h-[1px] bg-gray-700  ${
                    handelPages === 2 || handelPages === 3 ? bgColor : ""
                  }`}
                ></div>
                <button
                  onClick={() => setHandelPages(2)}
                  className={`w-[35px] h-[35px] rounded-full bg-gray-700  ${
                    handelPages === 2 || handelPages === 3 ? bgColor : ""
                  }`}
                ></button>
                <div
                  className={`w-[200px] h-[1px] bg-gray-700  ${
                    handelPages === 3 ? bgColor : ""
                  }`}
                ></div>
                <button
                  onClick={() => setHandelPages(3)}
                  className={`w-[35px] h-[35px] rounded-full bg-gray-700  ${
                    handelPages === 3 ? bgColor : ""
                  }`}
                ></button>
              </div>
              <div className="flex justify-between text-white">
                <p className="">Create Case</p>
                <p className="">Authorization</p>
                <p className="">Request</p>
              </div>
            </div>

            <section className={`${pageOne}`}>
              <div className=" mb-10 mt-20">
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
                              <option
                                key={category.value}
                                value={category.value}
                              >
                                {category.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mt-2">
                          <label className="font-semibold text-sm pt-3 ">
                            Case Registration Id:
                          </label>
                          <input
                            value={caseRegId}
                            onChange={(e) => setCaseRegId(e.target.value)}
                            placeholder="Enter Case ID"
                            className="border h-10 w-full px-2 text-sm text-white placeholder:white  bg-[#373737]"
                          />
                        </div>

                        <button
                          className="bg-black w-full mt-10 text-white py-2 "
                          onClick={submitCase}
                        >
                          Create Case
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className={`mt-20 w-[50%] m-auto ${pageTwo}`}>
              <p className="w-full text-white mb-10">
                It is a long established fact that a reader will be distracted
                by the readable content of a Pagewhen looking at its layout. The
                point of using Lorem Ipsum is that it has a more-or-less normal
                distribution of letters, as opposed to using Content here,
                content here, making it look like readable English. Many desktop
                publishing packages and web Pageeditors now use Lorem Ipsum as
                their default model text, and a search for lorem ipsum will
                uncover many web sites still in their infancy. Various versions
              </p>
              {/* <span className="text-white m-auto flex justify-center border-2 border-white w-[250px]  ">
                  <label for="fileUpload" className="p-5">
                    &quot;Upload Authorization Letter&quot;
                  </label>
                  <input
                    type="file"
                    id="fileUpload"
                    name="fileUpload"
                    className="hidden"
                  />
                </span> */}
              <span className="text-white m-auto flex justify-center border-2 border-white w-[250px]">
                <label htmlFor="fileUpload" className="p-5">
                  Upload Authorization Letter
                </label>
                <input
                  type="file"
                  id="fileUpload"
                  name="fileUpload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </span>

              <Link
                href="sample.pdf"
                download="sample.pdf"
                className="text-red-400 flex justify-center mt-5 "
              >
                Click here to download authorization templare
              </Link>
              <div className="flex justify-between">
                <div className=""></div>
                <button
                  onClick={() => setHandelPages(3)}
                  className="flex items-center  text-white  px-5 py-2 border border-white my-10  "
                >
                  Next <TbArrowRight className="mt-1" />
                </button>
              </div>
            </section>

            <section
              className={`flex justify-center text-white pt-20 px-6 mb-10 ${pageThree}`}
            >
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {createCase.map((item, id) => (
                  <div className="border border-white  h-[400px p-5 " key={id}>
                    <a href="" className="">
                      <MdQuestionMark className="text-white bg-gray-600 -full text-3xl mt-1 float-right mr-1 p-1" />
                    </a>
                    <div className="mt-16 flex justify-center">
                      <span className="">
                        <FaUserAlt className="text-7xl border border-white -full p-1" />
                      </span>
                    </div>
                    <div className="mt-5 text-center">
                      <Link
                        href={item.link}
                        className="text-center text-xl"
                        onClick={() => handleLinkClick(item.h2)}
                      >
                        {item.h2}
                      </Link>
                      <p className="mt-2">{item.p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <Footer />
        </div>
      </Sidbar>
    </>
  );
};

export default Page;
