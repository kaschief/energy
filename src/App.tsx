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
  const countryNames = Object.keys(Countries);

  const [country, setCountry] = useState("DE");
  const [gas, setGas] = useState("carbonmonoxide");
  const [displayCountry, setDisplayCountry] = useState("Germany");

  const [data, setData] = useState({
    data: [] as Data[],
  });
  const [fetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  const firstAvailableDate: string = "2019-01-01";
  const lastAvailableDate: string = "2021-09-10";
  const [beginDate, setBeginDate] = useState("2021-01-01");
  const [endDate, setEndDate] = useState(lastAvailableDate);

  useEffect(() => {
    setIsFetching(true);

    const API_URL = `https://api.v2.emissions-api.org/api/v2/${gas}/average.json?country=${country}&begin=${beginDate}&end=${endDate}`;

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
  }, [gas, country, beginDate, endDate]);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        width: "80%",
        flexDirection: "column",
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          margin: "20px",
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
        className="title"
      >
        <h2 style={{ margin: "0px 5px" }}>
          Emission of {gas} from {displayCountry}
        </h2>
      </div>

      <div
        style={{
          margin: "0 auto",
          display: "flex",
          width: "40%",
          justifyContent: "space-evenly",
          height: "50px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            width: "100%",
          }}
        >
          <p
            style={{
              margin: "0 5px",
              display: "flex",
            }}
          >
            From:
          </p>

          <input
            type="date"
            required
            name="begin-date"
            value={beginDate}
            min={firstAvailableDate}
            max="2021-09-10"
            onChange={(e) => {
              setBeginDate(e.target.value);
            }}
          />

          <p
            style={{
              margin: "0 5px",
            }}
          >
            To:
          </p>
          <input
            type="date"
            required
            name="end-date"
            value={endDate}
            min={beginDate}
            max={lastAvailableDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </div>
      </div>

      <div style={{ margin: "20px" }}>
        {countriesArr.map((country, index) => {
          return (
            <button
              key={index}
              style={{ margin: "0px 5px" }}
              onClick={() => {
                setCountry(country);
                setDisplayCountry(countryNames[index]);
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

      {!error && fetching && <div>Suspensful music plays....</div>}

      {error && <div>Sorry, no results were found for this search.</div>}
    </div>
  );
}

export default App;
