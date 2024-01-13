"use client";
import React from "react";
import { MdNotificationsActive } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/image/DALL·E 2023-10-31 12.26.46 - Illustration of a simple and modern logo with a flat red wallet icon, emp.png";

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between h-16 fixed top-0 w-full shadow-sm shadow-gray-700 backdrop-blur-lg">
        <div className="p-1 pl-2 flex items-center justify-center ">
          <Link href="/" className="">
            <Image src={Logo} alt="#" height={50} width={50}/>
          </Link>
        </div>
        <div className="text-white space-x-5 flex items-center justify-center">
          <Link className="font-semibold text-[#5b5d60] hover:text-[#818488]" href="/register">Register</Link>
          <Link className="font-semibold text-[#5b5d60] hover:text-[#818488]" href="/login">Login</Link>
          <Link className="font-semibold text-[#5b5d60] hover:text-[#818488]" href="/forgot-password">Forgot-password</Link>
          <Link className="font-semibold text-[#5b5d60] hover:text-[#818488]" href="/organizations">Organization</Link>
          <Link className="font-semibold text-[#5b5d60] hover:text-[#818488]" href="/search-organization">Search-organization</Link>
        </div>
        <div className="flex  items-center pr-20">
          <div className="">
            <Link href="/notification" className="">
              <MdNotificationsActive className="text-[#5b5d60] hover:text-[#dedfe0] text-2xl mr-7" />
            </Link>
          </div>
          <div className="">
            <Link href="/profile" className="">
              <FaUserLarge className="text-[#5b5d60] hover:text-[#dedfe0] text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
