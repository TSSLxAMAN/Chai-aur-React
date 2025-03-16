import React from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/register");
  }

  return (
    <div>
      <h1>Login</h1>
      <h2>Registe Now</h2>
      <button onClick={handleClick}>Click Here</button>
    </div>
  );
};

export default Login;
