import React from "react";
import { CountryData } from "./CountryFlag";

function CurrencyRow(props) {
  const {
    currencyOption,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;
  return (
    <div>
      <input
        type="number"
        className="input"
        value={amount}
        onChange={onChangeAmount}
      />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOption.map((option) => (
          <option key={option} value={option}>
            {CountryData.find((item) => item.currency === option).flag} &ensp;
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyRow;
