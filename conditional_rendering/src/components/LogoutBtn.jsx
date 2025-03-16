import React from "react";

const LogoutBtn = (props) => {
  return (
    <div>
      <h2>User is logged in</h2>
      <button
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => props.func(false)} // Set authenticate to false
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutBtn;
