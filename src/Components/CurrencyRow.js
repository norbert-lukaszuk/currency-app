import React, { Component } from "react";
export default function CurrencyRow({ currencyOptions }) {
  return (
    <div>
      <input type="number" className="currency__input" />
      <select>
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
