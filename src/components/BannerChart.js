import React from 'react'

function BannerChart(props) {
    const{
        tocurrency,
        fromCurrency,
        exchangeRates
    }=props
  return (
    <>
    <div className='hero'>
    <div className='heading'>
        <h1>CurrencyConverter</h1>
    </div>
    <div className='bannerchart'>
        <h2> Today's Price</h2>
        <p>One {fromCurrency} = {Math.round(exchangeRates*100)/100} {tocurrency}</p>
    </div>
    </div>
    </>
  )
  
}

export default BannerChart