import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [name, setName] = useState("");
  return (
    <>
      <Card name="Aman" func={setName} username={name} />
      <h2>Username : {name}</h2>
      <Card username={name}/>
    </>
  );
}

export default App;
