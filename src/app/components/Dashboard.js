"use client";

import React from "react";

const Dashboard = () => {
  return (
    <div className="h-[100vh]">
      <h1 className="text-2xl text-white font-bold text-center pt-20">
        Home
      </h1>
      <a href="/create-case" className="float-right text-white mr-10">
        create case
      </a>
    </div>
  );
};

export default Dashboard;
