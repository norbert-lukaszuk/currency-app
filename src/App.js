import React, { useState, useEffect } from "react";
import "./App.scss";
import CurrencyRow from "./Components/CurrencyRow";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const BASE_URL = "https://api.exchangeratesapi.io/latest";
  let fromAmount, toAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }
  console.log(fromAmount, toAmount, exchangeRate);
  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };
  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((resp) => resp.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);
  // pass the base currency & other currencys to option in CurrencyRow component
  useEffect(() => {
    fetch(BASE_URL)
      .then((resp) => resp.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[19];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);
  return (
    <div className="App">
      <h1>Exchange rate calculator</h1>
      <h3>From</h3>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        changeCurrency={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        handleAmountChange={handleFromAmountChange}
      />
      <h3>to</h3>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        changeCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        handleAmountChange={handleToAmountChange}
      />
    </div>
  );
}

export default App;
