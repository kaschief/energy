import React, { useEffect, useState } from "react";
import "./App.css";
import { Gases, Countries } from "./types.d";
import axios from "axios";

import { HorizontalBarChart } from "./components/HorizontalBarChart";

function App() {
  const countriesArr = Object.values(Countries);
  const gasesArr = Object.values(Gases);
  const [country, setCountry] = useState("DE");
  const [gas, setGas] = useState("carbonmonoxide");

  const [data, setData] = useState({
    labels: [],
    dataForUse: [],
  });
  const [loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const API_URL = `https://api.v2.emissions-api.org/api/v2/${gas}/average.json?country=${country}&begin=2021-02-24&end=2021-03-01`;
    axios.get(API_URL).then((response) => {
      const parsedDates = response.data.map((d: any) => {
        const date = new Date(d.end);
        const printedDate =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate();

        return printedDate;
      });
      setData({
        labels: parsedDates,
        dataForUse: response.data,
      });
      setIsLoaded(true);
    });
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
                setIsLoaded(false);
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
      {loaded && (
        <HorizontalBarChart
          labels={data.labels}
          gas={gas}
          allData={data.dataForUse}
        />
      )}
    </div>
  );
}

export default App;
