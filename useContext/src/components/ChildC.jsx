import React from "react";
import { useContext } from "react";
import { UserContext } from "../App";

const ChildC = () => {
  const user = useContext(UserContext);

  return (
    <div>
      <h1>Hello User : {user}</h1>
    </div>
  );
};

export default ChildC;
