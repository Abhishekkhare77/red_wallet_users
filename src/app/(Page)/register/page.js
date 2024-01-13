"use client";
import React from "react";
// import backgroundImg from "../../../../public/Gaurav/back-gradient-four.svg";
import SingUp from "../../components/SignUp";
const Register = () => {
  return (
    <div
      style={{
        // backgroundImage: `url(${backgroundImg.src})`,
        backgroundSize: "200%", // Resize the image to 150% of its original size
        backgroundRepeat: "repeat",
      }}
      className="flex  justify-center  py-10 "
    >
      <SingUp />
    </div>
  );
};

export default Register;
