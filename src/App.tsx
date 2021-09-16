import React, { useEffect, useState } from "react";
import "./App.css";
import { Gases, Countries } from "./types.d";

function App() {
  const [country, setCountry] = useState("DE");
  const [gas, setGas] = useState("carbonmonoxide");

  const countriesArr = Object.values(Countries);
  const gasesArr = Object.values(Gases);

  useEffect(() => {
    console.log(gas, country);
  }, [gas, country]);

  return (
    <div className="App">
      <div
        style={{
          margin: "20px",
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <h1 style={{ margin: "0px 5px" }}>{country}</h1>
        <h1 style={{ margin: "0px 5px" }}>{gas}</h1>
      </div>

      <div style={{ margin: "20px" }}>
        {countriesArr.map((country, index) => {
          return (
            <button
              key={index}
              style={{ margin: "0px 5px" }}
              onClick={() => {
                setCountry(country);
              }}
            >
              {country}
            </button>
          );
        })}
      </div>

      <div style={{ margin: "20px" }}>
        {gasesArr.map((gas, index) => {
          return (
            <button
              key={index}
              style={{ margin: "0px 5px" }}
              onClick={() => {
                setGas(gas);
              }}
            >
              {gas}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
