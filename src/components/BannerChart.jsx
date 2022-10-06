import React from 'react';

function BannerChart(props) {
    const { toCurrency, fromCurrency, exchangeRates } = props;
    if(!fromCurrency || !toCurrency) return
    return (
        <>
            <h1
                className={
                    'text-transparent text-5xl font-bold bg-clip-text bg-gradient-to-r from-[#a86ff7] to-[#d578e6]'
                }
            >
                CurrencyConverter
            </h1>
            <div className={'h-[1px] w-[200px] bg-gray-400/50 mb-5'} />
            <div className="text-center">
                <h2 className={'font-bold'}> Today's Price</h2>
                <p className={'text-xl font-light'}>
                <div className={"currency-flag currency-flag-lg currency-flag-" + fromCurrency.toLowerCase()}></div> 
                1 {fromCurrency} = {Math.round((exchangeRates + Number.EPSILON) * 100) / 100} {toCurrency}
                <div className={"currency-flag currency-flag-lg currency-flag-" + toCurrency.toLowerCase()}></div> 
                </p>
            </div>
            <div className={'h-[1px] w-[200px] bg-gray-400/50 mb-5'} />
        </>
    );
}

export default BannerChart;
