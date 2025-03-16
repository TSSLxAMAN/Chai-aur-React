import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <div className="h-screen">
        <h1 className="mx-auto text-center bg-orange-500 p-5 text-yellow-50 text-3xl font-bold ">
          Currency converter
        </h1>
        <div className="flex">
          <div className="w-1/2">
            <img
              src="https://images.pexels.com/photos/157520/pexels-photo-157520.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="w-full h-full object-contain rounded-e-3xl"
            />
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>
    </>
  );
}

export default App;
