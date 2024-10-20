import React, { useState, useEffect } from 'react';
import Navbar from '../UI/Navbar';
import '../UI/All.css';
import './Convert.css';

const Convert = () => {
    const [rates, setRates] = useState({});
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1000);
    const [baseCurrency, setBaseCurrency] = useState('eur');
    const [targetCurrency, setTargetCurrency] = useState('usd');
    const [convertedAmount, setConvertedAmount] = useState(null);

    const excludedCurrencies = ['1000sats', '1inch', 'doge']; 

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
                const data = await response.json();
                const filteredCurrencies = Object.keys(data).filter(
                    (currency) => !excludedCurrencies.includes(currency)
                );
                setCurrencies(filteredCurrencies);
            } catch (error) {
                console.error('Error fetching currencies:', error);
            }
        };

        fetchCurrencies();
    }, []);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`);
                const data = await response.json();
                setRates(data[baseCurrency]);
            } catch (error) {
                console.error('Error fetching exchange rates:', error);
            }
        };

        fetchRates();
    }, [baseCurrency]);

    // 금액 변환 함수
    const convertCurrency = () => {
        if (rates[targetCurrency]) {
            const rate = rates[targetCurrency];
            const result = (amount * rate).toFixed(3);
            setConvertedAmount(result);
        } else {
            setConvertedAmount('해당 통화는 지원되지 않습니다.');
        }
    };

    return (
        <div className='bg-color' style={{ minHeight: '100vh' }}>
            <Navbar />
            <div className='convert_content'>
                <h2 className='convert_title'>Currency Converter</h2>

                <div>
                    <label className='convert_label'>Base Currency: </label>
                    <select
                        className='convert_select'
                        value={baseCurrency}
                        onChange={(e) => setBaseCurrency(e.target.value)}
                    >
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className='convert_label'>Amount in {baseCurrency.toUpperCase()}: </label>
                    <input
                        type="number"
                        className='convert_input'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <div>
                    <label className='convert_label'>Target Currency: </label>
                    <select
                        className='convert_select'
                        value={targetCurrency}
                        onChange={(e) => setTargetCurrency(e.target.value)}
                    >
                        {Object.keys(rates).map((currency) => (
                            <option key={currency} value={currency}>
                                {currency.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>

                {convertedAmount && (
                    <div className="converted_result">
                        <h3>{convertedAmount} {targetCurrency.toUpperCase()}</h3>
                    </div>
                )}

                <div>
                    <label className='convert_label'>Title</label>
                    <input type='text' className='convert_input'></input>
                </div>

                <button onClick={convertCurrency} className='convert_button'>Convert</button>
            </div>
        </div>
    );
};

export default Convert;
