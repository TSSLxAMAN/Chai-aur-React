import { useState } from "react";
import "./App.css";

function App() {
  const [bgcolor, setBgcolor] = useState("");
  const [txtcolor, settxtcolor] = useState("");

  return (
    <>
      <div
        className="w-full mx-auto flex justify-center items-center h-screen"
        style={{ backgroundColor: bgcolor }}
      >
        <div
          className="w-50 text-8xl font-bold text-black "
          style={{ color: txtcolor }}
        >
          Background Changer
        </div>
        <div className="container fixed bottom-5 text-white rounded-full bg-zinc-200 p-3 flex justify-around align-middle">
          <button
            className="px-5 py-2 font-semibold rounded-3xl bg-red-600"
            onClick={() => {
              setBgcolor("#dc2626");
              settxtcolor("#26DCDC");
            }}
          >
            Red
          </button>
          <button
            className="px-5 py-2 font-semibold rounded-3xl bg-green-600"
            onClick={() => {
              setBgcolor("#16A34A");
              settxtcolor("#A3168D");
            }}
          >
            Green
          </button>
          <button
            className="px-5 py-2 font-semibold rounded-3xl bg-blue-600"
            onClick={() => {
              setBgcolor("#2563EB");
              settxtcolor("#EBDA25");
            }}
          >
            Blue
          </button>
          <button
            className="px-5 py-2 font-semibold rounded-3xl bg-yellow-600"
            onClick={() => {
              setBgcolor("#CA8A04");
              settxtcolor("#0435CA");
            }}
          >
            Yellow
          </button>
          <button
            className="px-5 py-2 font-semibold rounded-3xl bg-slate-600"
            onClick={() => {
              setBgcolor("#475569");
              settxtcolor("#69A547");
            }}
          >
            Slate
          </button>
          <button
            className="px-5 py-2 font-semibold rounded-3xl bg-orange-600"
            onClick={() => {
              setBgcolor("#EA580C");
              settxtcolor("#0CEA9E");
            }}
          >
            Orange
          </button>
          <button
            className="px-5 py-2 font-semibold rounded-3xl bg-teal-600"
            onClick={() => {
              setBgcolor("#0D9488");
              settxtcolor("#940D4A");
            }}
          >
            Teal
          </button>
          <button
            className="px-5 py-2 font-semibold rounded-3xl bg-cyan-600"
            onClick={() => {
              setBgcolor("#0891B2");
              settxtcolor("#B20824");
            }}
          >
            Cyan
          </button>
          <button
            className="px-5 py-2 font-semibold rounded-3xl bg-pink-600"
            onClick={() => {
              setBgcolor("#DB2777");
              settxtcolor("#27DB99");
            }}
          >
            Pink
          </button>
          <button
            className="px-5 py-2 font-semibold rounded-3xl bg-violet-600"
            onClick={() => {
              setBgcolor("#7C3AED");
              settxtcolor("#3AED7C");
            }}
          >
            Violet
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
