import React from "react";
import { useParams } from "react-router-dom";
const Params = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Parameter are : {id}</h1>
    </div>
  );
};

export default Params;
