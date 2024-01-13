/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import React from "react";
import { RiGitPullRequestFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { LuMonitorSpeaker } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";
import { MdOutlineModelTraining } from "react-icons/md";
import { BiCog } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { GoFileDirectoryFill } from "react-icons/go";
import { TbUserSearch } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";
import Link from "next/link";

const Sidbar = ({ children }) => {
  const data = [
    {
      id: 1, // Unique ID for the Home item
      icon: <IoMdHome />,
      label: "Home",
      url: "/",
    },
    {
      id: 2, // Unique ID for the My Request item
      icon: <RiGitPullRequestFill />,
      label: "My Request",
      url: "my-request",
    },
    {
      id: 3, // Unique ID for the Search Wallet item
      icon: <FaMagnifyingGlass />,
      label: "Search Wallet",
      url: "/search-wallet",
    },
    {
      id: 4, // Unique ID for the Monitoring item
      icon: <LuMonitorSpeaker />,
      label: "Monitoring",
      url: "/monitoring",
    },
    {
      id: 5, // Unique ID for the Training item
      icon: <MdOutlineModelTraining />,
      label: "Training",
      url: "/training",
    },
    {
      id: 6, // Unique ID for the Cases item
      icon: <FaBook />,
      label: "Cases",
      url: "/cases",
    },
    {
      id: 7, // Unique ID for the Investigation item
      icon: <TbUserSearch />,
      label: "Investigation",
      url: "/investigation",
    },
    {
      id: 8, // Unique ID for the Directory item
      icon: <GoFileDirectoryFill />,
      label: "Directory",
      url: "/directory",
    },
    {
      id: 9, // Unique ID for the Support item
      icon: <FaHandshake />,
      label: "Support",
      url: "/support",
    },
    {
      id: 10, // Unique ID for the Setting item
      icon: <BiCog />,
      label: "Setting",
      url: "/setting",
    },
    {
      id: 11,
      icon: <TbLogout2 />,
      label: "Logout",
      url: "/login",
    },
  ];

  const [clickedItem, setClickedItem] = useState(null);
  const [sidebar, setSideBar] = useState(false);
  const [logo, setlogo] = useState(false);

  const toggleSideBar = () => {
    setSideBar(!sidebar);
    setlogo(!logo);
  };

  const handleItemClick = (id) => {
    setClickedItem(id);
  };

  const clidIcon = (id) => {
    setClickedItem(id);
    // setSideBar();
  };
  return (
    <div className="pt-[1px]">
      <aside
        className={`mt-16  fixed top- left-0 z-40 bg-[#181c21] shadow-sm shadow-gray-700 transition-all duration-300 ease-in-out ${sidebar ? " pr-3" : " w-[15%] "
          } pb-8  hidden md:block h-full`}
      >
        <div className="h-full py-4 overflow-y-auto bg-[#181c21]">
          <button
            className=" text-xl my- text-gray-300 hover:text-white pl-3"
            onClick={toggleSideBar}
          >
            <RxHamburgerMenu />
          </button>
          {sidebar ? (
            <ul className="font-normal flex flex-col gap-5 pt-1">
              {data.map((item) => (
                <li
                  key={item.id}
                  className={`flex items-center cursor-pointer pl-3 ${clickedItem === item.id ? "bg-[#F5F5F2]" : ""
                    }`}
                  onClick={() => clidIcon(item.id)}
                >
                  <a
                    href={item.url}
                    className={
                      clickedItem === item.id
                        ? "text-[#E50913] text-xl"
                        : "text-white text-xl"
                    }
                  >
                    {item.icon}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="flex flex-col gap-2 ">
              {data.map((item) => (
                <li
                  key={item.id}
                  className={`flex items-center cursor-pointer pl-3 py-1 ${clickedItem === item.id ? "bg-[#F5F5F2]" : ""
                    }`}
                  onClick={() => handleItemClick(item.id)}
                >
                  <Link
                    href={item.url}
                    className="flex items-center group text-gray-900 rounded-lg dark:text-white "
                  >
                    <p
                      className={
                        clickedItem === item.id
                          ? "text-[#E50913] text-xl"
                          : "text-gray-300 group-hover:text-white text-xl"
                      }
                    >
                      {" "}
                      {item.icon}
                    </p>
                    <span
                      className={
                        clickedItem === item.id
                          ? "text-[#E50913] pl-3"
                          : "text-gray-300 group-hover:text-white pl-3 text-base"
                      }
                    >
                      {item.label}{" "}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      <aside
        className={`mt-16 fixed top-0 left-0 z-40 bg-[#181818] transition duration-300 ease-in-out ${sidebar ? "w-60 " : "w-16  pr-5"
          }   block md:hidden`}
      >
        <div className="h-full  overflow-y-auto bg-[#181818] dark:bg-gray-800">
          <button
            className=" text-xl pt-5 w-full px-5 text-gray-300 hover:text-white"
            onClick={toggleSideBar}
          >
            <RxHamburgerMenu />
          </button>
          {sidebar ? (
            <ul className="font-medium flex flex-col gap-3 px-5 bg-[#181818] w-full py-10">
              {data.map((item) => (
                <li
                  key={item.id}
                  className={`flex items-center cursor-pointer py-1 rounded-md text-sm ${clickedItem === item.id ? "bg-[#F5F5F2]" : ""
                    }`}
                  onClick={() => clidIcon(item.id)}
                >
                  <Link
                    href={item.url}
                    className="flex items-center text-gray-900 rounded-lg"
                  >
                    <p
                      className={
                        clickedItem === item.id
                          ? "text-[#E50913]"
                          : "text-gray-300 hover:text-white pl-3 text-lg"
                      }
                    >
                      {" "}
                      {item.icon}
                    </p>
                    <span className="ml-3 text-[#E50913]">{item.label} </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
      </aside>
      <div className={`${sidebar ? "ml-10" : "ml-64"}`}>
        {children}
      </div>
    </div>
  );
};

export default Sidbar;
