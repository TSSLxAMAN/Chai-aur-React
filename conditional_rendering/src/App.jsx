import { useState } from "react";
import "./App.css";
import LoginBtn from "./components/LoginBtn";
import LogoutBtn from "./components/LogoutBtn";
function App() {
  const [authenticate, setAuthenticate] = useState(false);

  // Logical rendering
  return (
    <>
      {authenticate && <LogoutBtn func={setAuthenticate} />} 
      {!authenticate && <LoginBtn func={setAuthenticate} />}
    </>
  );

  // Turnary rendering
  return (
    <div className="App">
      {authenticate ? (
        <LogoutBtn func={setAuthenticate} />
      ) : (
        <LoginBtn func={setAuthenticate} />
      )}
    </div>
  );

  // If else rendering
  // if (authenticate) {
  //   return (
  //     <>
  //       <LoginBtn func={setAuthenticate} />
  //     </>
  //   );
  // } else {
  //   return (
  //     <>
  //       <LogoutBtn func={setAuthenticate}/>
  //     </>
  //   );
  // }
}

export default App;
