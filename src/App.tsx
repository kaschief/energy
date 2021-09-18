import React, { useEffect, useState } from "react";
import "./App.css";
import { Gases, Countries } from "./types.d";
import axios from "axios";

import { Chart } from "./components/Chart";

interface Data {
  average: number;
  end: string;
  start: string;
}

interface ServerResponse {
  data: Data[];
}

function App() {
  const countriesArr = Object.values(Countries);
  const gasesArr = Object.values(Gases);
  const [country, setCountry] = useState("DE");
  const [gas, setGas] = useState("carbonmonoxide");

  const [data, setData] = useState({
    data: [] as Data[],
  });
  const [fetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsFetching(true);

    const API_URL = `https://api.v2.emissions-api.org/api/v2/${gas}/average.json?country=${country}&begin=2021-02-24&end=2021-03-01`;

    axios.get(API_URL).then(({ data }: ServerResponse) => {
      const dataPresent = Array.isArray(data) && !!data.length;
      setIsFetching(false);

      if (dataPresent) {
        setData({
          data,
        });
        setError(false);
      } else {
        setError(true);
      }
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

      {!error && !fetching && <Chart gas={gas} data={data.data} />}

      {!error && fetching && <div>Still fetching your data</div>}

      {error && <div>Sorry, no results were found for this search.</div>}
    </div>
  );
}

export default App;
