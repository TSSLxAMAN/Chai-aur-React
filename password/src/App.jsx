import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState();
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "1234567890";
    }
    if (charAllowed) {
      str += "!@#$%^&*()?><";
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-zinc-700 ">
        <div className="w-50 bg-slate-600 px-9 py-4 rounded-lg text-3xl ">
          <p className="mb-3 text-teal-50 font-bold text-center ">
            Password Generator
          </p>
          <input
            type="text"
            className="p-3"
            readOnly
            value={password}
            ref={passwordRef}
          />
          <button
            className="bg-blue-500 p-3 text-white font-semibold"
            onClick={copyPassword}
          >
            Copy
          </button>
          <div
            className="
          "
          >
            <input
              type="range"
              min={4}
              max={32}
              value={length}
              id="passLength"
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label
              htmlFor="passLength"
              className="text-white font-semibold text-lg me-4"
            >
              Lenght {length}
            </label>
            <input
              type="checkbox"
              id="numCheckbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />
            <label
              htmlFor="numCheckbox"
              className="text-white font-semibold text-lg me-4"
            >
              Number
            </label>
            <input
              type="checkbox"
              id="charCheckbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />
            <label
              htmlFor="charCheckbox"
              className="text-white font-semibold text-lg"
            >
              Character
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
