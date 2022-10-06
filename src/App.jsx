import { useEffect, useState } from 'react';
import './App.css';
import BannerChart from './components/BannerChart';
import CurrencyRow from './components/CurrencyRow';
import GitIcon from './components/GitIcon';
import "../node_modules/currency-flags/dist/currency-flags.css";

const INITIAL_BASE_CURRENCY = 'USD';
const BASE_URL = 'https://api.exchangerate.host';

const CURRENCY_CHANGE_TYPES = {
    FROM: 'FROM',
    TO: 'TO',
}

function App() {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();

    const [amount, setAmount] = useState(1);
    const [persistAmountInFromCurrency, setPersistAmountInFromCurrency] = useState(true);

    const [exchangeRates, setExchangeRates] = useState();

    let toAmount, fromAmount;
    if (persistAmountInFromCurrency) {
        fromAmount = amount;
        toAmount = amount * exchangeRates;
    } else {
        toAmount = amount;
        fromAmount = amount / exchangeRates;
    }

    useEffect(() => {
        fetch(`${BASE_URL}/latest?base=${INITIAL_BASE_CURRENCY}`)
            .then((res) => res.json())
            .then((data) => {
                const currencies = Object.keys(data.rates);
                // Take the first currency
                let firstCurrency = currencies[0];
                // If the first currency is same as the initial base currency, take the second one
                if (firstCurrency === INITIAL_BASE_CURRENCY) firstCurrency = currencies[1];

                setCurrencies([...currencies]);
                setFromCurrency(data.base);
                setToCurrency(firstCurrency);
                setExchangeRates(data.rates[firstCurrency]);
            });
    }, []);

    // used function instead of useEffect to reduce unnecessary re-renders
    const fetchConversionRates = (fromCurrency, toCurrency) => {
        if (!fromCurrency || !toCurrency) return;

        console.log(fromCurrency,toCurrency)
        fetch(`${BASE_URL}/convert?from=${fromCurrency}&to=${toCurrency}`)
            .then((res) => res.json())
            .then((data) => setExchangeRates(data.result));
    };

    const handleFromAmountChange = e => {
        setAmount(e.target.value);
        setPersistAmountInFromCurrency(true);
    };

    const handleToAmountChange = e => {
        setAmount(e.target.value);
        setPersistAmountInFromCurrency(false);
    };

    const handleClear = () => {
        setAmount(0);
    };

    const handleCurrencyChange = (value, type = CURRENCY_CHANGE_TYPES.FROM) => {
        switch (type) {
            case CURRENCY_CHANGE_TYPES.FROM:
                setFromCurrency(value);
                fetchConversionRates(value, toCurrency);
                break;
            case CURRENCY_CHANGE_TYPES.TO:
                setToCurrency(value);
                fetchConversionRates(fromCurrency, value);
                break;
            default:
                console.error('Invalid type passed. Must be one of FROM, TO. Found: ' + type);
        }
    };

    return (
        <div
            className={
                'w-screen h-screen flex flex-col gap-5 items-center justify-center bg-gradient-to-br from-[#2e3553]/[95%] to-[#2e3553] text-[#faf8fd]'
            }
        >
            <GitIcon />
            <BannerChart fromCurrency={fromCurrency} toCurrency={toCurrency} exchangeRates={exchangeRates} />
            <div className='flex flex-col gap-10'>
                <h1 className={'text-[#d578e6] text-center'}>Convert</h1>
                <div className='flex flex-col'>
                    <CurrencyRow
                        currencyOption={currencies}
                        selectedCurrency={fromCurrency}
                        onCurrencyChange={(e) => handleCurrencyChange(e.target.value, 'FROM')}
                        amount={fromAmount}
                        onChangeAmount={handleFromAmountChange}
                    />
                    <div className='text-4xl font-bold text-center'>=</div>
                    <CurrencyRow
                        currencyOption={currencies}
                        selectedCurrency={toCurrency}
                        onCurrencyChange={(e) => handleCurrencyChange(e.target.value, 'TO')}
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
