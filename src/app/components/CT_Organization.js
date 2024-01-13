"use client";

import React, { useContext, useState } from "react";
import VariablesContext from "../provider/VariablesContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Organization_type = [
  { label: "Law Enforcement", value: "law enforcement" },
  { label: "web3", value: "web3" },
  { label: "Legal", value: "Legal" },
  { label: "Exchange", value: "Exchange" },
  { label: "Others", value: "Others" },
];
const countries = [
  { label: "India", value: "India" },
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

const CT_Organization = () => {
  const { userId } = useContext(VariablesContext);

  const [orgName, setOrgName] = useState("");
  const [orgWebsite, setOrgWebsite] = useState("");
  const [orgCountry, setOrgCountry] = useState(countries[0]?.value);
  const [orgState, setOrgState] = useState("");
  const [orgCity, setOrgCity] = useState("");
  const [orgAddress, setOrgAddress] = useState("");
  const [orgType, setOrgType] = useState(Organization_type[0]?.value);
  const [govOrg, setGovOrg] = useState(false);
  const router = useRouter();

  const addOrganization = () => {
    const options = {
      method: "POST",
      url: "https://red.catax.me/user/requests/create-organization",
      headers: { "Content-Type": "application/json" },
      data: {
        org_name: orgName,
        is_government_org: govOrg,
        org_website: orgWebsite,
        org_country: orgCountry,
        org_city: orgCity,
        org_state: orgState,
        org_address: orgAddress,
        org_type: orgType,
        created_by: userId,
        is_org_approved: false,
        relationship_manager: [],
        api_key_approved: null,
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
      });
  };

  console.log(userId, "userId ");

  return (
    <div className="w-full ">
      <section className="">
        <div className=" mb-10 mt-20">
          <div className="h-full ">
            <div className="border px-10 py-8 w-80 sm:w-[40%] m-auto text-white  shadow-lg">
              <div className="flex justify-center">
                <h1 className="font-semibold text-lg">
                  Create New Organization
                </h1>
              </div>
              <div className="">
                <div className="flex gap-10">
                  <div className="">
                    <div className="mt-2 ">
                      <label className="font-semibold text-sm pt-3 ">
                        Organization Name:
                      </label>
                      <input
                        required
                        type="text"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        name="Organization Name"
                        placeholder="Enter Organization Name"
                        className="border h-10 w-full px-2 text-sm text-white  placeholder-white bg-[#373737]"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="font-semibold text-sm pt-3 ">
                        Organization Website:
                      </label>
                      <input
                        type="text"
                        value={orgWebsite}
                        onChange={(e) => setOrgWebsite(e.target.value)}
                        name="Organization Website"
                        placeholder="Enter Organization Website"
                        className="border h-10 w-full px-2 text-sm text-white placeholder-white   bg-[#373737]"
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor="caseType"
                        className="font-semibold text-sm mt-2 block text-white"
                      >
                        Organization type:
                      </label>
                      <select
                        id="caseType"
                        value={orgType}
                        onChange={(e) => setOrgType(e.target.value)}
                        className="border h-10 w-full px-2 text-sm text-white  bg-[#373737]"
                      >
                        {Organization_type.map((country, i) => (
                          <option key={i} value={country.value}>
                            {country.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <div className="mt-4 flex w-full items-center gap-5">
                        <input
                          type="checkbox"
                          value={govOrg}
                          onChange={() => setGovOrg(!govOrg)}
                          className="h-4 w-4"
                        />
                        <label forHtml="" className="">
                          Government Approved
                        </label>
                        <br />
                      </div>
                      <div className="mt-2 flex items-center gap-5">
                        <input
                          type="checkbox"
                          id=""
                          name=""
                          value={true}
                          className="h-4 w-4"
                        />
                        <label forHtml="">I agree to T&C</label>
                        <br />
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="mt-2">
                      <label
                        htmlFor="caseType"
                        className="font-semibold text-sm mt-2 block text-white"
                      >
                        Organization Country:
                      </label>
                      <select
                        id="caseType"
                        value={orgCountry}
                        onChange={(e) => setOrgCountry(e.target.value)}
                        className="border h-10 w-full px-2 text-sm text-white  bg-[#373737]"
                      >
                        {countries.map((country, i) => (
                          <option key={i} value={country.value}>
                            {country.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-2">
                      <label className="font-semibold text-sm pt-3 ">
                        Organization State:
                      </label>
                      <input
                        type="text"
                        value={orgState}
                        onChange={(e) => setOrgState(e.target.value)}
                        name="Organization State"
                        placeholder="Enter Organization State"
                        className="border h-10 w-full px-2 text-sm text-white placeholder-white   bg-[#373737]"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="font-semibold text-sm pt-3 ">
                        Organization City:
                      </label>
                      <input
                        type="text"
                        value={orgCity}
                        onChange={(e) => setOrgCity(e.target.value)}
                        name="Organization City"
                        placeholder="Enter Organization City"
                        className="border h-10 w-full px-2 text-sm text-white placeholder-white   bg-[#373737]"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="font-semibold text-sm pt-3 ">
                        Organization Address:
                      </label>
                      <input
                        type="text"
                        value={orgAddress}
                        onChange={(e) => setOrgAddress(e.target.value)}
                        name="Organization Address"
                        placeholder="Enter Organization City"
                        className="border h-10 w-full px-2 text-sm text-white placeholder-white   bg-[#373737]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={addOrganization}
                className="w-full mt-10 py-2 border border-white "
              >
                <h3 className="text-white">Add Organization</h3>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CT_Organization;
