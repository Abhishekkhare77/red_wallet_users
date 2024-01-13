import React from "react";
import SignIn from "../../components/SignIn";
// import backgroundImg from "../../../../public/Gaurav/back-gradient-four.svg";

const Page = () => {
  return (
    <div
      style={{
        // backgroundImage: `url(${backgroundImg.src})`,
        backgroundSize: "200%",
        backgroundRepeat: "repeat",
      }}
      className="flex justify-center pt-10 sm:pt-20 h-[100vh] "
    >
      <SignIn />
    </div>
  );
};

export default Page;
