import { useEffect, useState } from "react";
import "./App.css";
import LoggerComponent from "./components/LoggerComponent";
import DataFetcher from "./components/DataFetcher";
import TimerComponent from "./components/TimerComponent";
import ResizeComponent from "./components/ResizeComponent";
function App() {
  // const [count, setCount] = useState(0);
  // const [count2, setCount2] = useState(0);

  // const handelClick = () => {
  //   setCount(count + 1);
  // };

  // const handelClick2 = () => {
  //   setCount2(count2 + 1);
  // };

  // first -> side-effect function
  // second -> cleanup function
  // third -> dependency array

  // Structure of useEffect
  // useEffect(
  //   () => {
  //     // first
  //     return () => {
  //       // second
  //     };
  //   },
  //   [
  //     // third
  //   ]
  // );

  // variation 1 - runs on every render
  // useEffect(() => {
  //   alert("I run on every render");
  // });

  // Variation 2 - runs only on the first render (it has an empty dependency array)
  // useEffect(() => {
  //   alert("I run only on the first render");
  // }, []);

  // Variation 3 - runs only when the count changes (it has count in the dependency array)
  // useEffect(() => {
  //   alert("I run only when the count changes");
  // }, [count]);

  // Variation 4 - multiple dependencies
  // useEffect(() => {
  //   alert("I run only when the count changes");
  // }, [count, count2]);

  // Variation 5 - cleanup function
  // useEffect(() => {
  //   alert("Count is updated");
  //   return () => {
  //     alert("Count is unmounted");
  //   };
  // }),
  //   [count, count2];

  return (
    <>
      {/* <p>{count}</p>
      <button onClick={handelClick}>Button 1</button> */}
      {/* <br />
      <p>{count2}</p>
      <button onClick={handelClick2}>Button 2</button> */}

      {/* <LoggerComponent /> */}

      {/* <DataFetcher /> */}

      {/* <TimerComponent /> */}

      <ResizeComponent />
    </>
  );
}

export default App;
