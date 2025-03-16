import { useState } from "react";
import Children from "./Components/Children";
import Button from "./Components/Button";
function App() {
  const [count, setcount] = useState(0);
  function countBtn() {
    return setcount(count + 1);
  }
  return (
    <>
      <Button event={countBtn} cuurentCount={count}></Button>
      <Children>
        <p>I am inside the app.jsx</p>
      </Children>
    </>
  );
}

export default App;
