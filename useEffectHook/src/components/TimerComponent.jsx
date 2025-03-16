import React, { useEffect, useState } from "react";

const TimerComponent = () => {
  const [second, setsecond] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setsecond((second) => second + 1);
      console.log("Timer started");
    }, 1000);

    return () => {
      clearInterval(intervalId);
      console.log("Timer stopped");
    };
  }, []);
  return (
    <div>
      <h1>{second}</h1>
    </div>
  );
};

export default TimerComponent;
