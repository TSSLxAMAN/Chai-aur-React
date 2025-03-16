import React from "react";
const Card = (props) => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        margin: "10px",
        backgroundColor: "lightgray",
      }}
    >
      <h1>Admin : {props.name}</h1>
      <input
        type="text"
        onChange={(e) => {
          props.func(e.target.value);
        }}
      />
      sub admin : {props.username}
    </div>
  );
};

export default Card;
