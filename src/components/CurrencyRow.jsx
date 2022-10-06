import React from 'react';
import './CurrencyRow.css';

function CurrencyRow(props) {
    const { currencyOption, selectedCurrency, onCurrencyChange, onChangeAmount, amount } = props;
    if(!selectedCurrency) return
    return (
        <div className={'flex gap-5'}>
            <input
                type="number"
                className="rounded border-2 bg-transparent border-[#a86ff7] transition-all ease-out duration-300 outline-none px-4 py-2"
                value={amount}
                onChange={onChangeAmount}
                min="0"
            />
            <select
                className={
                    'rounded border-2 border-[#a86ff7] transition-all ease-out duration-300 outline-none px-4 py-2 bg-transparent'
                }
                value={selectedCurrency}
                onChange={onCurrencyChange}
            >
                {currencyOption.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <div className={"currency-flag currency-flag-lg currency-flag-" + selectedCurrency.toLowerCase()}></div> 
        </div>
    );
}

export default CurrencyRow;
