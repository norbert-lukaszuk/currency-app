import React, { Component } from "react";
export default function CurrencyRow({
  currencyOptions,
  selectedCurrency,
  changeCurrency,
}) {
  return (
    <div>
      <input type="number" className="currency__input" />
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
