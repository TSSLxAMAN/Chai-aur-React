import { useState } from "react";
import { createContext } from "react";
import "./App.css";
import ChildA from "./components/ChildA";

const UserContext = createContext();
function App() {
  // Step 1 - create context Provider

  // Setp 2 - Pass teh child which become consumer
  // <UserContext.Provider>
  //   <ChildA />
  // </UserContext.Provider>;

  // Step 3 - Pass the value
  const [user, setUser] = useState("Aman");
  const [theme, setTheme] = useState("white");

  // Step 4 - Use it inside Consumer
  return (
    <>
    
      <UserContext.Provider value={user}>
        <ChildA />
      </UserContext.Provider>
    </>
  );
}

export default App;
export { UserContext };
