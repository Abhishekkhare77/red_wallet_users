"use client";
import React, { useContext, useEffect, useState } from "react";
import Sidbar from "@/app/components/Sidbar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import VariablesContext from "../../provider/VariablesContext";
import toast from "react-hot-toast";

const Page = () => {
  const [organizations, setOrganizations] = useState([]);
  const { userId } = useContext(VariablesContext);
  const [orgId, setOrgId] = useState("");

  useEffect(() => {
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
  }, []);

  const handleRequest = () => {
    const options = {
      method: "POST",
      url: "https://red.catax.me/user/requests/join_organization",
      headers: { "Content-Type": "application/json" },
      data: {
        request_type: "join",
        request_user: userId,
        request_org: orgId,
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

  console.log(userId, "userIdsss");
  console.log(organizations, "org");

  return (
    <>
      <Navbar />
      <Sidbar>

        <div className="min-h-[100vh]">
          <div className="w-full">
            <section className="">
              <div className=" mb-10 pt-40">
                <div className="h-full">
                  <div className="border px-10 py-8 w-80 sm:w-[40%] m-auto text-white shadow-lg">
                    <div className="flex justify-center">
                      <h1 className="font-semibold text-lg">Join Organization</h1>
                    </div>
                    <div>
                      <div>
                        <div className="mt-2">
                          <label
                            htmlFor="caseType"
                            className="font-semibold text-sm mt-2 block text-white"
                          >
                            Organization Name:
                          </label>
                          <select
                            id="caseType"
                            className="border h-10 w-full px-2 text-sm text-white  bg-[#373737]"
                            value={orgId}
                            onChange={(e) => setOrgId(e.target.value)}
                          >
                            {organizations.map((org, i) => (
                              <option key={i} value={org._id}>
                                {org.org_name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          onClick={handleRequest}
                          className="bg-black hover:bg-gray-800 rounded w-full mt-10 py-2 border border-white "
                        >
                          <h3 className="text-white">Join organization</h3>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
