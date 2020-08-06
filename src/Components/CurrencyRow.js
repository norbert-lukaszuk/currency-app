import React, { Component } from "react";
export default function CurrencyRow({
  currencyOptions,
  selectedCurrency,
  changeCurrency,
  amount,
  handleAmountChange,
}) {
  console.log(amount);
  return (
    <div>
      <input
        type="number"
        className="currency__input"
        value={amount}
        onChange={handleAmountChange}
      />
      <select value={selectedCurrency} onChange={changeCurrency}>
        {/* populate options with currencyOptions from props */}
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
