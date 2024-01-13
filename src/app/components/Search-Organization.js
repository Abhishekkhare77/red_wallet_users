"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Organization = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [selectOrg, setSelectOrg] = useState("");
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storData = localStorage.getItem("user_id");
    setUserId(storData);
    getOrganization();
  }, []);

  const getOrganization = () => {
    const options = {
      method: "GET",
      url: "https://red.catax.me/user/supported-organizations",
    };

    axios
      .request(options)
      .then(function (response) {
        setOrganizations(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleFilterChange = () => {
    if (!input) {
      toast.error("Please enter field",{
        style: {
          borderRadius: '5px',
          background: '#333',
          color: '#fff',
          border:'2px solid white'
        },
      });
      setFilteredData([]);
      return;
    }
    const filteredOrgs = organizations.filter((org) =>
      org.org_name.toLowerCase().includes(input.toLowerCase())
    );
    if (!filteredOrgs.length == 0) {
      setFilteredData(filteredOrgs);
      setShowCreate(false);
    } else {
      setShowCreate(true);
      setFilteredData([]);
    }
  };
  const sendRequest = () => {
    const options = {
      method: "POST",
      url: "https://red.catax.me/user/requests/join_organization",
      headers: { "Content-Type": "application/json" },
      data: {
        request_type: "join",
        request_user: userId,
        request_org: selectOrg?._id,
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
        setShowJoinModal(false);
        router.push("/organizations");
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
        if (
          error?.response?.data?.detail ==
          "User already has a pending request to of the user"
        ) {
          router.push("/organizations");
        }
        if (error?.response?.status == 403) {
          router.push("/");
        }
        setShowJoinModal(false);
      });
  };

  const handleSelectOrg = (org) => {
    setSelectOrg(org);
    setShowJoinModal(true);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {showJoinModal ? (
        <div className="text-white border p-5">
          <h1> Are you want to join {selectOrg?.org_name} organization</h1>
          <div className="flex justify-center gap-5 mt-5">
            <button className="hover:text-gray-300" onClick={sendRequest}>
              Yes
            </button>
            <button
              className="hover:text-gray-300"
              onClick={() => setShowJoinModal(false)}
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="border px-10 py-8 w-80 sm:w-96 text-white shadow-lg">
          <div className="flex justify-center">
            <h1 className="font-semibold text-lg">Search-Organization</h1>
          </div>

          <div className="flex flex-col gap-3 ">
            <h3 className="font-semibold text-sm mt-5">Organization</h3>
            <input
              type="text"
              className="border h-10 w-full px-2 text-sm outline-none text-black cursor-pointer "
              placeholder="Enter Organization"
              id="emailSignIn"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div>
            <button
              className="bg-black w-full mt-6 py-2"
              onClick={handleFilterChange}
            >
              <h3 className="text-white">Search</h3>
            </button>
          </div>
          <div className="flex flex-col gap-3 ">
            {filteredData.length > 0 &&
              filteredData.map((item) => (
                <button
                  className="font-semibold text-xl text-center text-black mt-5 bg-gray-400 p-2"
                  key={item._id}
                  onClick={() => handleSelectOrg(item)}
                >
                  {item.org_name}
                </button>
              ))}
            {showCreate && (
              <div className="mt-3">
                <h1 className="text-center">No Result Found</h1>
                <button className="bg-black w-full mt-3 py-2 ">
                  <h3 className="text-white">
                    <Link href="/New-organization">Create Organization</Link>
                  </h3>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Organization;
