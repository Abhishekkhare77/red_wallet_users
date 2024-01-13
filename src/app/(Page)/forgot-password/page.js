import React from "react";
import Forgot_Password from "../../components/Forgot_Password";

const Page = () => {
  return (
    <div
      style={{
        fontFamily: "catax",
        // backgroundImage: `url(${backgroundImg.src})`,
        backgroundSize: "200%", // Resize the image to 150% of its original size
        backgroundRepeat: "repeat",
      }}
      className="flex justify-center pt-10 sm:pt-20 h-[100vh] "
    >
      <Forgot_Password />
    </div>
  );
};

export default Page;
