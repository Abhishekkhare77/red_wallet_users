"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import VariablesContext from "../provider/VariablesContext";
import toast from "react-hot-toast";

const countries = [
  { label: "Afghanistan", value: "Afghanistan" },
  { label: "Albania", value: "Albania" },
  { label: "Algeria", value: "Algeria" },
  { label: "Andorra", value: "Andorra" },
  { label: "Angola", value: "Angola" },
  { label: "Antigua and Barbuda", value: "Antigua and Barbuda" },
  { label: "Argentina", value: "Argentina" },
  { label: "Armenia", value: "Armenia" },
  { label: "Australia", value: "Australia" },
  { label: "Austria", value: "Austria" },
  { label: "Azerbaijan", value: "Azerbaijan" },
  { label: "Bahamas", value: "Bahamas" },
  { label: "Bahrain", value: "Bahrain" },
  { label: "Bangladesh", value: "Bangladesh" },
  { label: "Barbados", value: "Barbados" },
  { label: "Belarus", value: "Belarus" },
  { label: "Belgium", value: "Belgium" },
  { label: "Belize", value: "Belize" },
  { label: "Benin", value: "Benin" },
  { label: "Bhutan", value: "Bhutan" },
  { label: "Bolivia", value: "Bolivia" },
  { label: "Bosnia and Herzegovina", value: "Bosnia and Herzegovina" },
  { label: "Botswana", value: "Botswana" },
  { label: "Brazil", value: "Brazil" },
  { label: "Brunei", value: "Brunei" },
  { label: "Bulgaria", value: "Bulgaria" },
  { label: "Burkina Faso", value: "Burkina Faso" },
  { label: "Burundi", value: "Burundi" },
  { label: "Cabo Verde", value: "Cabo Verde" },
  { label: "Cambodia", value: "Cambodia" },
  { label: "Cameroon", value: "Cameroon" },
  { label: "Canada", value: "Canada" },
  { label: "Central African Republic", value: "Central African Republic" },
  { label: "Chad", value: "Chad" },
  { label: "Chile", value: "Chile" },
  { label: "China", value: "China" },
  { label: "Colombia", value: "Colombia" },
  { label: "Comoros", value: "Comoros" },
  { label: "Congo", value: "Congo" },
  { label: "Costa Rica", value: "Costa Rica" },
  { label: "Croatia", value: "Croatia" },
  { label: "Cuba", value: "Cuba" },
  { label: "Cyprus", value: "Cyprus" },
  { label: "Czechia", value: "Czechia" },
  { label: "Denmark", value: "Denmark" },
  { label: "Djibouti", value: "Djibouti" },
  { label: "Dominica", value: "Dominica" },
  { label: "Dominican Republic", value: "Dominican Republic" },
  { label: "Ecuador", value: "Ecuador" },
  { label: "Egypt", value: "Egypt" },
  { label: "El Salvador", value: "El Salvador" },
  { label: "Equatorial Guinea", value: "Equatorial Guinea" },
  { label: "Eritrea", value: "Eritrea" },
  { label: "Estonia", value: "Estonia" },
  { label: "Eswatini", value: "Eswatini" },
  { label: "Ethiopia", value: "Ethiopia" },
  { label: "Fiji", value: "Fiji" },
  { label: "Finland", value: "Finland" },
  { label: "France", value: "France" },
  { label: "Gabon", value: "Gabon" },
  { label: "Gambia", value: "Gambia" },
  { label: "Georgia", value: "Georgia" },
  { label: "Germany", value: "Germany" },
  { label: "Ghana", value: "Ghana" },
  { label: "Greece", value: "Greece" },
  { label: "Grenada", value: "Grenada" },
  { label: "Guatemala", value: "Guatemala" },
  { label: "Guinea", value: "Guinea" },
  { label: "Guinea-Bissau", value: "Guinea-Bissau" },
  { label: "Guyana", value: "Guyana" },
  { label: "Haiti", value: "Haiti" },
  { label: "Honduras", value: "Honduras" },
  { label: "Hungary", value: "Hungary" },
  { label: "Iceland", value: "Iceland" },
  { label: "India", value: "India" },
  { label: "Indonesia", value: "Indonesia" },
  { label: "Iran", value: "Iran" },
  { label: "Iraq", value: "Iraq" },
  { label: "Ireland", value: "Ireland" },
  { label: "Israel", value: "Israel" },
  { label: "Italy", value: "Italy" },
  { label: "Jamaica", value: "Jamaica" },
  { label: "Japan", value: "Japan" },
  { label: "Jordan", value: "Jordan" },
  { label: "Kazakhstan", value: "Kazakhstan" },
  { label: "Kenya", value: "Kenya" },
  { label: "Kiribati", value: "Kiribati" },
  { label: "Korea, North", value: "Korea, North" },
  { label: "Korea, South", value: "Korea, South" },
  { label: "Kosovo", value: "Kosovo" },
  { label: "Kuwait", value: "Kuwait" },
  { label: "Kyrgyzstan", value: "Kyrgyzstan" },
  { label: "Laos", value: "Laos" },
  { label: "Latvia", value: "Latvia" },
  { label: "Lebanon", value: "Lebanon" },
  { label: "Lesotho", value: "Lesotho" },
  { label: "Liberia", value: "Liberia" },
  { label: "Libya", value: "Libya" },
  { label: "Liechtenstein", value: "Liechtenstein" },
  { label: "Lithuania", value: "Lithuania" },
  { label: "Luxembourg", value: "Luxembourg" },
  { label: "Madagascar", value: "Madagascar" },
  { label: "Malawi", value: "Malawi" },
  { label: "Malaysia", value: "Malaysia" },
  { label: "Maldives", value: "Maldives" },
  { label: "Mali", value: "Mali" },
  { label: "Malta", value: "Malta" },
  { label: "Marshall Islands", value: "Marshall Islands" },
  { label: "Mauritania", value: "Mauritania" },
  { label: "Mauritius", value: "Mauritius" },
  { label: "Mexico", value: "Mexico" },
  { label: "Micronesia", value: "Micronesia" },
  { label: "Moldova", value: "Moldova" },
  { label: "Monaco", value: "Monaco" },
  { label: "Mongolia", value: "Mongolia" },
  { label: "Montenegro", value: "Montenegro" },
  { label: "Morocco", value: "Morocco" },
  { label: "Mozambique", value: "Mozambique" },
  { label: "Myanmar", value: "Myanmar" },
  { label: "Namibia", value: "Namibia" },
  { label: "Nauru", value: "Nauru" },
  { label: "Nepal", value: "Nepal" },
  { label: "Netherlands", value: "Netherlands" },
  { label: "New Zealand", value: "New Zealand" },
  { label: "Nicaragua", value: "Nicaragua" },
  { label: "Niger", value: "Niger" },
  { label: "Nigeria", value: "Nigeria" },
  { label: "North Macedonia", value: "North Macedonia" },
  { label: "Norway", value: "Norway" },
  { label: "Oman", value: "Oman" },
  { label: "Pakistan", value: "Pakistan" },
  { label: "Palau", value: "Palau" },
  { label: "Palestine", value: "Palestine" },
  { label: "Panama", value: "Panama" },
  { label: "Papua New Guinea", value: "Papua New Guinea" },
  { label: "Paraguay", value: "Paraguay" },
  { label: "Peru", value: "Peru" },
  { label: "Philippines", value: "Philippines" },
  { label: "Poland", value: "Poland" },
  { label: "Portugal", value: "Portugal" },
  { label: "Qatar", value: "Qatar" },
  { label: "Romania", value: "Romania" },
  { label: "Russia", value: "Russia" },
  { label: "Rwanda", value: "Rwanda" },
  { label: "Saint Kitts and Nevis", value: "Saint Kitts and Nevis" },
];
const department1 = [
  { label: "Legal", value: "Legal" },
  { label: "Compliance", value: "Compliance" },
  { label: "Risk", value: "Risk" },
  { label: "Investigation", value: "Investigation" },
  { label: "Other", value: "Other" },
];
const designation1 = [
  { label: "designation 1", value: "designation 1" },
  { label: "designation 2", value: "designation 2" },
  { label: "designation 3", value: "designation 3" },
  { label: "designation 4", value: "designation 4" },
  { label: "designation 5", value: "designation 5" },
];
const registrationCategory1 = [
  { label: "Exchange", value: "Exchange" },
  { label: "LEA", value: "LEA" },
  { label: "Lawyer", value: "Lawyer" },
  { label: "Investigation", value: "Investigation" },
  { label: "Web 3", value: "Web 3" },
  { label: "DeFi", value: "DeFi" },
  { label: "DEX", value: "DEX" },
  { label: "Other", value: "Other" },
];
const interest1 = [
  { label: "Wallet Search", value: "Wallet Search" },
  { label: "Track Funds", value: "Track Funds" },
  { label: "Compliance", value: "Compliance" },
  { label: "Notice", value: "Notice " },
  { label: "Investigations", value: "Investigations" },
  { label: "Partnership", value: "Partnership" },
  { label: "RWIX", value: "RWIX" },
  { label: "Others", value: "Others" },
];

const SignUp = () => {
  const { setUserEmail, setUserId } = useContext(VariablesContext);
  const router = useRouter();
  const [security, setSecurity] = useState([]);
  const [device, setDevice] = useState("");
  const [browser, setBrowser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState(countries[0]?.value);
  const [department, setDepartment] = useState(department1[0]?.value);
  const [designation, setDesignation] = useState(designation1[0]?.value);
  const [registrationCategory, setRegistrationCategory] = useState(
    registrationCategory1[0]?.value
  );
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    getsSecurityData();
    getDevice();
  }, []);

  const getsSecurityData = () => {
    const options = {
      method: "GET",
      url: "https://ipapi.co/json",
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setSecurity(response?.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getDevice = () => {
    const isMobile =
      /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    setDevice(isMobile ? "Mobile" : "Desktop");

    // Get browser information
    const userAgent = navigator.userAgent;
    const browsers = {
      chrome: /chrome/i.test(userAgent),
      safari: /safari/i.test(userAgent),
      firefox: /firefox/i.test(userAgent),
      edge: /edge/i.test(userAgent),
      opera: /opera/i.test(userAgent),
      ie: /msie|trident/i.test(userAgent),
    };

    const detectedBrowser = Object.keys(browsers).find(
      (browser) => browsers[browser]
    );
    setBrowser(detectedBrowser || "Unknown");
  };

  console.log(device, browser);

  const handleInterestChange = (interest) => {
    // Toggle the selected interest
    setInterests((prevInterests) =>
      prevInterests.includes(interest)
        ? prevInterests.filter((item) => item !== interest)
        : [...prevInterests, interest]
    );
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Please check confirm Password",{
        style: {
          borderRadius: '5px',
          background: '#333',
          color: '#fff',
          border:'2px solid white'
        },
      });
      return;
    }
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !country ||
      !department ||
      !designation ||
      !registrationCategory ||
      interests.length === 0
    ) {
      toast("Please fill all options",{
        style: {
          borderRadius: '5px',
          background: '#333',
          color: '#fff',
          border:'2px solid white'
        },
      });
      return;
    }

    const isValidPassword = validatePassword(password);

    if (isValidPassword) {
      registerUser();
    } else {
      alert(
        "Password must have at least one uppercase letter, one digit, and one special character. Minimum length: 8 characters."
      );
    }
  };

  const validatePassword = (password) => {
    // Add your password validation logic here
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const registerUser = () => {
    const options = {
      method: "POST",
      url: "https://red.catax.me/user/register",
      headers: { "Content-Type": "application/json" },
      data: {
        User_info: {
          user_email: email,
          user_password: password,
          user_designation: designation,
          user_department: department,
          registration_category: registrationCategory,
          user_country: country,
          user_service_interest: interests,
          referred_by: null,
        },
        security: {
          ip: security?.ip,
          network: security?.network,
          version: security?.version,
          city: security?.city,
          region: security?.region,
          region_code: security?.region_code,
          country: security?.country,
          country_name: security?.country_name,
          postal: security?.postal,
          latitude: security?.latitude,
          longitude: security?.longitude,
          timezone: security?.timezone,
          utc_offset: security?.utc_offset,
          org: security?.org,
          browser: browser,
          platform: device,
        },
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
        router.push("/verify-email");
        setUserEmail(email);
        setUserId(response?.data?.user_id);
        localStorage.setItem("user_id", response?.data?.user_id);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setCountry("");
        setDepartment("");
        setDesignation("");
        setRegistrationCategory("");
        setInterests([]);
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

  console.log(designation);
  return (
    <div className="h-full">
      <div className="border border-gray-400 px-10 py-5  text-white  shadow-lg">
        <div className="flex justify-center">
          <h1 className="font-semibold text-lg">Resister your account</h1>
        </div>
        <div className="">
          <div className="">
            <div className="mt-2">
              <label className="font-semibold text-sm pt-3 ">Email</label>
              <input
                required
                name="email"
                value={email}
                placeholder="Email Id"
                className="border border-gray-400 h-10 w-full px-2 text-sm text-white  bg-[#373737] placeholder:text-white"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-2">
              <label className="font-semibold text-sm mt-5">Set Password</label>
              <input
                required
                name="password"
                placeholder="Password"
                className="border border-gray-400 h-10 w-full px-2 text-sm text-white  bg-[#373737] placeholder:text-white"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-2">
              <label className="font-semibold text-sm mt-2">
                Confirm Password
              </label>
              <input
                required
                placeholder="Confirm Password"
                name="password"
                value={confirmPassword}
                className="border border-gray-400 h-10 w-full px-2 text-sm text-white  bg-[#373737] placeholder:text-white"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-5">
            <div className="">
              <div className=" mt-2">
                <label
                  htmlFor=""
                  className="font-semibold text-sm mt-2 block text-white"
                >
                  Country
                </label>

                <select
                  id="caseType"
                  value={country}
                  className="border border-gray-400 h-10 w-60  px-2 text-sm text-white  bg-[#373737]"
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" mt-2 ">
                <label
                  htmlFor=""
                  className="font-semibold text-sm mt-2 block text-white"
                >
                  Designation
                </label>

                <select
                  id="caseType"
                  value={designation}
                  className="border border-gray-400 h-10 w-60  px-2 text-sm text-white  bg-[#373737]"
                  onChange={(e) => setDesignation(e.target.value)}
                >
                  {designation1.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div className=" mt-2  ">
                <label
                  htmlFor=""
                  className="font-semibold text-sm mt-2 block text-white"
                >
                  Department
                </label>

                <select
                  id="caseType"
                  value={department}
                  className="border border-gray-400 h-10  w-60  px-2 text-sm text-white  bg-[#373737]"
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {department1.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" mt-2  ">
                <label
                  htmlFor=""
                  className="font-semibold text-sm mt-2 block text-white"
                >
                  Registration Category
                </label>

                <select
                  id="caseType"
                  value={registrationCategory}
                  className="border border-gray-400 h-10 w-60 px-2 text-sm text-white  bg-[#373737]"
                  onChange={(e) => setRegistrationCategory(e.target.value)}
                >
                  {registrationCategory1.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className=" mt-2">
            <h3 className="font-semibold text-sm my-2 block text-white">
              Interest
            </h3>
            <div className="grid grid-cols-2 justify-between gap-x-8">
              {interest1.map((interest) => (
                <div key={interest.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 bg-black"
                    value={interest.value}
                    checked={interests.includes(interest.value)}
                    onChange={() => handleInterestChange(interest.value)}
                  />
                  <label htmlFor="" className="block text-white">
                    {interest.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className="bg-black border border-gray-400 hover:border-gray-600  w-full mt-5 py-2 rounded"
          onClick={handleRegister}
        >
          <h3 className="text-white">Register</h3>
        </button>
        <div className="flex mt-5 justify-center ">
          <p className="text-sm">
            Don &apos; t have an account?{" "}
            <Link href="/login" className="underline font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
