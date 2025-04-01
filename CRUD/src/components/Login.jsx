import React from "react";
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { login } from '../features/loginSlice';
import { useNavigate } from "react-router";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const themeBgColor = useSelector((state) => state.theme.bgColor);
  const themeTextColor = useSelector((state) => state.theme.textColor);
  const themeCardColor = useSelector((state) => state.theme.btnColor);
  const themeBorderColor = useSelector(state => state.theme.border);
  const cardColor = useSelector(state => state.theme.cardColor);
  const cardColorBtn = useSelector(state => state.theme.cardColorBtn);
  const user = useSelector((state) => state.user.userLogin);

  function handelLogin(){
    const userCredential ={
      username: username,
      password: password,
    }

    dispatch(login(userCredential))

    setPassword("")
    setUsername("")
   
  }

  useEffect(() => {
    if (user && !user.error) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className={`flex justify-center items-center h-screen ${themeBgColor} ${themeTextColor}`}>
      <div className={` p-8 rounded-2xl shadow-lg w-96 border ${cardColor} `}>
        <h2 className="text-2xl font-semibold text-center mb-6">Employee Login</h2>

        <form className="flex flex-col">
          {/* Username Input */}
          <label className="text-sm mb-1">Username</label>
          <input
            type="text"
            className="p-3 rounded-lg focus:outline-none focus:ring-2 mb-4"
            style={{ backgroundColor: "inherit", color: "inherit", border: "1px solid white" }}
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Password Input */}
          <label className="text-sm mb-1">Password</label>
          <input
            type="password"
            className="p-3 rounded-lg focus:outline-none focus:ring-2 mb-6"
            style={{ backgroundColor: "inherit", color: "inherit", border: "1px solid white" }}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Login Button */}
          <button
            className={`py-3 rounded-lg text-lg font-semibold transition-all cursor-pointer ${cardColorBtn}`}
            style={{ backgroundColor: themeCardColor, border: themeBorderColor }}
            onClick={handelLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
