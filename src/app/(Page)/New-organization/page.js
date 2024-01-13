import React from "react";
import CT_Organization from "../../components/CT_Organization";

const Page = () => {
  return (
    <div className="">
      <div
        style={{
          // backgroundImage: `url(${backgroundImg.src})`,
          backgroundSize: "200%", // Resize the image to 150% of its original size
          backgroundRepeat: "repeat",
        }}
        className="flex justify-center  min-h-[100vh] "
      >
        <CT_Organization forHtml="someValue" />
      </div>
    </div>
  );
};

export default Page;
