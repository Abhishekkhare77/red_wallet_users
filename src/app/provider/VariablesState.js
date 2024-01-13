"use client";
import VariablesContext from "./VariablesContext";
import { useState } from "react";

const VariablesState = (props) => {
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");
  const [userEmail, setUserEmail] = useState("");

  return (
    <VariablesContext.Provider
      value={{
        userId,
        setUserId,
        userToken,
        setUserToken,
        userEmail,
        setUserEmail,
      }}
    >
      {props.children}
    </VariablesContext.Provider>
  );
};

export default VariablesState;
