import React from "react";

const Button = (props) => {
  return (
    <div>
      <h1>{props.cuurentCount}</h1>
      <button onClick={props.event}>Click me</button>
    </div>
  );
};

export default Button;
