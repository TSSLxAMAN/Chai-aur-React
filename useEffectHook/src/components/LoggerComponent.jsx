import React from "react";
import { useState, useEffect } from "react";

const LoggerComponent = () => {
  const [count, setCount] = useState(0);

  const handelClick = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    alert("I run on every render");
  });

  return (
    <div>
      <p>Count : {count}</p>
      <button onClick={handelClick}>Button</button>
    </div>
  );
};

export default LoggerComponent;
