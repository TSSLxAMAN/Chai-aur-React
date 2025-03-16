import React from "react";

function Card(props) {
  return (
    <>
      <div className="max-w-xs p-6 rounded-md shadow-md bg-black mt-6 ">
        <img
          src={props.link}
          alt=""
          className="object-cover object-center w-full rounded-md h-72 bg-gray-500"
        />
        <div className="mt-6 mb-2">
          <span className="block text-sm font-medium font-mono tracking-widest uppercase text-indigo-400">
            Number #{props.number}
          </span>
          <h2 className="text-xl font-semibold text-white tracking-wide">
            {props.location_name}
          </h2>
        </div>
        <p className="text-gray-300">
          {props.detail}
        </p>
      </div>
    </>
  );
}

export default Card;
