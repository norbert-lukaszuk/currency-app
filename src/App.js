import React, { useState, useEffect } from "react";
import "./App.scss";
import CurrencyRow from "./Components/CurrencyRow";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const BASE_URL = "https://api.exchangeratesapi.io/latest";
  console.log(currencyOptions);
  // pass the base currency & other currencys to option in CurrencyRow component
  useEffect(() => {
    fetch(BASE_URL)
      .then((resp) => resp.json())
      .then((data) => {
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
      });
  }, []);
  return (
    <div className="App">
      <h1>Exchange calculator</h1>
      <CurrencyRow currencyOptions={currencyOptions} />
      <CurrencyRow currencyOptions={currencyOptions} />
    </div>
  );
}

export default App;
