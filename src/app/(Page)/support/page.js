import React from "react";
import Sidbar from "@/app/components/Sidbar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import FileImage from "../../../../public/image/WhatsApp Image 2023-11-30 at 4.56.00 PM.jpeg";
import Link from "next/link";

const Page = () => {
  return (
    <>
    <Navbar />
    <Sidbar>
      <div className="min-h-[100vh]">
        <div className="pt-20 mb-10">
          <div className="pt-10 text-center text-white">
            <h1 className="text-5xl">How can we help you, Anders?</h1>
            <p className="text-2xl text-[#7E7F81] mt-5">
              Choose a category to find the help you need
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 px-8 md:pr-10">
              <div className="border rounded px-3 py-8 flex flex-col justify-center bg-[#232323] hover:bg-gray-700/50">
                <Link href="/details" className="m-auto ">
                  <Image src={FileImage} alt="#" height={100} width={100} />
                </Link>
                <Link href="/details" className="mt-5 text-xl">
                  Payments and billing
                </Link>
              </div>
              <div className="border rounded px-3 py-8 flex flex-col justify-center bg-[#232323] hover:bg-gray-700/50">
                <Link href="/details" className="m-auto ">
                  <Image src={FileImage} alt="#" height={100} width={100} />
                </Link>
                <Link href="/details" className="mt-5 text-xl">
                  Payments and billing
                </Link>
              </div>
              <div className="border rounded px-3 py-8 flex flex-col justify-center bg-[#232323] hover:bg-gray-700/50">
                <Link href="/details" className="m-auto ">
                  <Image src={FileImage} alt="#" height={100} width={100} />
                </Link>
                <Link href="/details" className="mt-5 text-xl">
                  Security and privacy
                </Link>
              </div>
              <div className="border rounded px-3 py-8 flex flex-col justify-center bg-[#232323] hover:bg-gray-700/50">
                <Link href="/details" className="m-auto ">
                  <Image src={FileImage} alt="#" height={100} width={100} />
                </Link>
                <Link href="/details" className="mt-5 text-xl">
                  Dropbox Business
                </Link>
              </div>
              <div className="border rounded px-3 py-8 flex flex-col justify-center bg-[#232323] hover:bg-gray-700/50">
                <Link href="/details" className="m-auto ">
                  <Image src={FileImage} alt="#" height={100} width={100} />
                </Link>
                <Link href="/details" className="mt-5 text-xl">
                  Syncing and uploads
                </Link>
              </div>
              <div className="border rounded px-3 py-8 flex flex-col justify-center bg-[#232323] hover:bg-gray-700/50">
                <Link href="/details" className="m-auto ">
                  <Image src={FileImage} alt="#" height={100} width={100} />
                </Link>
                <Link href="/details" className="mt-5 text-xl">
                  Sign-in help
                </Link>
              </div>
              <div className="border rounded px-3 py-8 flex flex-col justify-center bg-[#232323] hover:bg-gray-700/50">
                <Link href="/details" className="m-auto ">
                  <Image src={FileImage} alt="#" height={100} width={100} />
                </Link>
                <Link href="/details" className="mt-5 text-xl">
                  Desktop client and web app
                </Link>
              </div>
              <div className="border rounded px-3 py-8 flex flex-col justify-center bg-[#232323] hover:bg-gray-700/50">
                <Link href="/details" className="m-auto ">
                  <Image src={FileImage} alt="#" height={100} width={100} />
                </Link>
                <Link href="/details" className="mt-5 text-xl ">
                  Manage account
                </Link>
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
