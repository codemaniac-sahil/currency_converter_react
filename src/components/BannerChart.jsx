import React from 'react';

function BannerChart(props) {
    const { toCurrency, fromCurrency, exchangeRates } = props;
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
                    1 {fromCurrency} = {Math.round((exchangeRates + Number.EPSILON) * 100) / 100} {toCurrency}
                </p>
            </div>
            <div className={'h-[1px] w-[200px] bg-gray-400/50 mb-5'} />
        </>
    );
}

export default BannerChart;
