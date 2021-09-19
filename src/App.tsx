import React, { useEffect, useState } from "react";
import "./App.css";
import { Gases, Countries, Data, ServerResponse } from "./types.d";
import axios from "axios";
import { StyleSheet, css } from "aphrodite";

import { Chart } from "./components/Chart";

const styles = StyleSheet.create({
  wrapper: {
    display: "grid",
    maxWidth: "80vw",
    gridTemplateAreas: `
    "gases dates countries"
    "title title title"
    "chart chart chart"
    "chart chart chart"
  `,
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: `
    minmax(15px, auto)
    auto
    minmax(740px, auto)
    `,
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
    margin: "40px",
  },
  title: {
    gridArea: "title",
    width: "100%",
    textAlign: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  datesContainer: {
    gridArea: "dates",
    width: "100%",
    justifyContent: "space-evenly",
    display: "flex",
    flexDirection: "row",
  },
  gasesContainer: {
    gridArea: "gases",
    width: "30vw",
    justifyContent: "flex-start",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
  },
  countriesContainer: {
    gridArea: "countries",
    width: "20vw",
    justifyContent: "flex-end",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
  },
  chartContainer: {
    gridArea: "chart",
    width: "80vw",
    margin: "0 auto 20px",
    padding: "20px",
  },
});

export const App: React.FC = (): JSX.Element => {
  const countriesArr = Object.values(Countries);
  const gasesArr = Object.values(Gases);
  const countryNames = Object.keys(Countries);

  const [country, setCountry] = useState(Countries.Germany);
  const [gas, setGas] = useState(Gases.CARBON_MONOXIDE);
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
    <div className={css(styles.wrapper)}>
      <section className={css(styles.title)}>
        <h2>
          Emission of {gas} from {displayCountry}
        </h2>
      </section>

      <div className={css(styles.datesContainer)}>
        <p>From:</p>
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

        <p>To:</p>
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

      <div className={css(styles.countriesContainer)}>
        {countriesArr.map((country, index) => {
          return (
            <button
              key={index}
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

      <div className={css(styles.gasesContainer)}>
        {gasesArr.map((gas, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                setGas(gas);
              }}
            >
              {gas}
            </button>
          );
        })}
      </div>

      <div className={css(styles.chartContainer)}>
        {!error && !fetching && <Chart gas={gas} data={data.data} />}

        {!error && fetching && <div>Suspensful music plays....</div>}

        {error && <div>Sorry, no results were found for this search.</div>}
      </div>
    </div>
  );
};

export default App;
