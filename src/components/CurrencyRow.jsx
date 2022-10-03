import React from 'react';

function CurrencyRow(props) {
    const { currencyOption, selectedCurrency, onChangeCurrency, onChangeAmount, amount } = props;
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
                onChange={onChangeCurrency}
            >
                {currencyOption.map((option) => (
                    <option key={option} value={option} className={'text-black'}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CurrencyRow;
