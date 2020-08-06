import React, { useState, useEffect } from "react";
import "./App.scss";
import CurrencyRow from "./Components/CurrencyRow";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const BASE_URL = "https://api.exchangeratesapi.io/latest";
  console.log(currencyOptions);
  console.log(toCurrency);
  console.log(fromCurrency);

  // pass the base currency & other currencys to option in CurrencyRow component
  useEffect(() => {
    fetch(BASE_URL)
      .then((resp) => resp.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);

        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);
  return (
    <div className="App">
      <h1>Exchange calculator</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        changeCurrency={(e) => setFromCurrency(e.target.value)}
      />
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        changeCurrency={(e) => setToCurrency(e.target.value)}
      />
    </div>
  );
}

export default App;
