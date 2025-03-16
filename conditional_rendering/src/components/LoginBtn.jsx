import React from "react";

const LoginBtn = (props) => {
  return (
    <div>
      <h2>User is not logged in</h2>
      <button
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => props.func(true)} // Set authenticate to true
      >
        Login
      </button>
    </div>
  );
};

export default LoginBtn;
