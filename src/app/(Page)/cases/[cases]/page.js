"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArchive, FaEdit } from "react-icons/fa";

const Page = ({ params }) => {
  const [caseData, setCaseData] = useState();
  const [userId, setUserId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const { cases } = params;
  const router = useRouter();

  useEffect(() => {
    const storData = localStorage.getItem("user_id");
    setUserId(storData);
    getCase();
  }, []);

  const getCase = () => {
    const options = {
      method: "GET",
      url: `https://red.catax.me/user/case/${cases}`,
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setCaseData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleArchive = () => {
    const options = {
      method: "DELETE",
      url: `https://red.catax.me/user/case/archive/${cases}`,
      params: { user_id: userId },
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
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleDeleteConfirmation = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to archive this case?"
    );

    if (isConfirmed) {
      handleArchive();
    } else {
      console.log("User canceled");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const caseLetter = () => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    const form = new FormData();
    form.append("file", selectedFile); // Append the selected file

    const options = {
      method: "POST",
      url: `https://red.catax.me/user/case/add-letter`,
      params: { case_id: cases }, // Pass 'cases' as a query parameter
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
      },
      data: form,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success(response?.data?.message);
        router.push("/cases");
      })
      .catch(function (error) {
        console.error(error);
        toast.error(error?.response?.data?.detail);
      });
  };
  console.log("Uploading PDF:", selectedFile);
  return (
    <div>
      <div className="pt-20 h-[100vh] text-white">
        <div className="text-center font-bold text-xl">
          <h1>Case Type : {caseData?.case_type}</h1>
          <h1>Case Category : {caseData?.case_category}</h1>
          <h1>Case Stddatus : {caseData?.case_status}</h1>
        </div>

        <div className="flex items-center text-white justify-center mt-5 gap-5">
          <Link href={`/cases/update/${cases}`}>
            <FaEdit size={30} />
          </Link>
          <button onClick={handleDeleteConfirmation}>
            <FaArchive size={25} />
          </button>
        </div>
        <div className="flex items-center justify-center mt-10">
          <input type="file" accept=".pdf" onChange={handleFileChange} />
        </div>
        {selectedFile && (
          <div className="flex items-center justify-center mt-10 ">
            <button onClick={caseLetter} className="border p-2">
              Add letter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
