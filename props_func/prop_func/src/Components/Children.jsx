import React from "react";

const Children = (props) => {
  return (
    <div>
      <h1>I am inside a components</h1>
      <h2>{props.children}</h2>
    </div>
  );
};

export default Children;
