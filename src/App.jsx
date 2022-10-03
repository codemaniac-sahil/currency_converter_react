import { useEffect, useState } from 'react';
import './App.css';
import BannerChart from './components/BannerChart';
import CurrencyRow from './components/CurrencyRow';
import GitIcon from './components/GitIcon';

const BASE_URL='https://v6.exchangerate-api.com/v6/62eef46e2964c6f134cf92cc/latest/USD'

function App() {
    const [currencyOption, setCurrencyOption] = useState([]);
    const [fromCurrency, setFromCurrency] = useState();
    const [tocurrency, setTocurrency] = useState();
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
    const [exchangeRates, setExchangeRates] = useState();
    let toAmount, fromAmount;
    if (amountInFromCurrency) {
        fromAmount = amount;
        toAmount = amount * exchangeRates;
    } else {
        toAmount = amount;
        fromAmount = amount / exchangeRates;
    }

    useEffect(() => {
        fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => {
                const firstCurrency = Object.keys(data.conversion_rates)[1];
                setCurrencyOption([...Object.keys(data.conversion_rates)]);
                setFromCurrency(data.base_code);
                setTocurrency(firstCurrency);
                setExchangeRates(data.conversion_rates[firstCurrency]);
            });
    }, []);

    useEffect(() => {
        if (fromCurrency != null && tocurrency != null) {
            fetch(`https://v6.exchangerate-api.com/v6/62eef46e2964c6f134cf92cc/pair/${fromCurrency}/${tocurrency}`)
                .then((res) => res.json())
                .then((data) => setExchangeRates(data.conversion_rate));
        }
    }, [fromCurrency, tocurrency]);

    function handleFromAmountChange(e) {
        setAmount(e.target.value);
        setAmountInFromCurrency(true);
    }

    function handleToAmountChange(e) {
        setAmount(e.target.value);
        setAmountInFromCurrency(false);
    }

    function handleClear() {
        setAmount(0);
    }

    return (
        <div
            className={
                'w-screen h-screen flex flex-col gap-5 items-center justify-center bg-gradient-to-br from-[#2e3553]/[95%] to-[#2e3553] text-[#faf8fd]'
            }
        >
            <GitIcon />
            <BannerChart fromCurrency={fromCurrency} tocurrency={tocurrency} exchangeRates={exchangeRates} />
            <div className="flex flex-col gap-10">
                <h1 className={'text-[#d578e6] text-center'}>Convert</h1>
                <div className="flex flex-col">
                    <CurrencyRow
                        currencyOption={currencyOption}
                        selectedCurrency={fromCurrency}
                        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
                        amount={fromAmount}
                        onChangeAmount={handleFromAmountChange}
                    />
                    <div className="text-4xl font-bold text-center">=</div>
                    <CurrencyRow
                        currencyOption={currencyOption}
                        selectedCurrency={tocurrency}
                        onChangeCurrency={(e) => setTocurrency(e.target.value)}
                        amount={toAmount}
                        onChangeAmount={handleToAmountChange}
                    />

                    <button
                        className="text-sm font-bold text-[#faf8fd] rounded-lg px-4 py-3 w-full mt-5 transition-all ease-out duration-300 bg-gradient-to-tr from-[#a86ff7] to-[#d578e6]"
                        onClick={handleClear}
                    >
                        CLEAR
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
