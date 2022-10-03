import React from 'react';

function BannerChart(props) {
    const { tocurrency, fromCurrency, exchangeRates } = props;
    return (
        <>
            <h1>CurrencyConverter</h1>
            <div className="text-center">
                <h2> Today's Price</h2>
                <p>
                    One {fromCurrency} = {Math.round(exchangeRates * 100) / 100} {tocurrency}
                </p>
            </div>
        </>
    );
}

export default BannerChart;
