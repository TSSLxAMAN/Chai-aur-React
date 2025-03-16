import React, { useEffect, useState } from "react";

const ResizeComponent = () => {
  const [windowWidth, setwindowWidth] = useState(0);
  const [windowHeight, setwindowHeight] = useState(0);

  useEffect(() => {
    const handelSizeWidth = () => {
      setwindowWidth(window.innerWidth);
    };
    const handelSizeHeight = () => {
      setwindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handelSizeHeight);
    window.addEventListener("resize", handelSizeWidth);

    console.log("Added component ");

    return () => {
      console.log("Compnent Removed");
      window.removeEventListener("resize", handelSizeHeight);
      window.removeEventListener("resize", handelSizeWidth);
    };
  }, []);

  return (
    <div>
      <h1>Window Width is {windowWidth}</h1>
      <h1>Window Height is {windowHeight}</h1>
    </div>
  );
};

export default ResizeComponent;
