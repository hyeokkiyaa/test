import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Navbar from '../UI/Navbar';
import '../UI/All.css';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [currencies, setCurrencies] = useState([]);
    const [rates, setRates] = useState({});
    const [historyRates, setHistoryRates] = useState([]);
    const [startDate] = useState('2024-03-02');
    const [endDate, setEndDate] = useState('');
    const [baseCurrency, setBaseCurrency] = useState('krw');
    const [targetCurrency, setTargetCurrency] = useState('usd');
    const [amount, setAmount] = useState(1000);
    const [convertedAmount, setConvertedAmount] = useState(null);

    const allowedCurrencies = ['krw', 'usd', 'eur', 'afn', 'cny', 'jpy', 'chf', 'itl', 'rub', 'brl', 'frf', 'mxn', 'nok', 'sgd', 'aud', 'bef'];

    const getTodayDateMinusOne = () => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        return today.toISOString().split('T')[0];
    };

    const fetchCurrencies = async () => {
        try {
            const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
            const data = await response.json();
            setCurrencies(Object.keys(data));
        } catch (error) {
            console.error('Error fetching currencies:', error);
        }
    };

    const fetchRates = async (date) => {
        try {
            const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${baseCurrency}.json`);
            const data = await response.json();
            return data[baseCurrency];
        } catch (error) {
            console.error(`Error fetching exchange rates for ${date}:`, error);
            return null;
        }
    };

    // 날짜 범위의 환율 데이터를 가져오는 함수
    const fetchHistoricalData = async () => {
        const dateArray = [];
        const rateArray = [];
        let currentDate = new Date(startDate);
        const todayDate = new Date(getTodayDateMinusOne());

        while (currentDate <= todayDate) {
            const formattedDate = currentDate.toISOString().split('T')[0];
            const ratesForDate = await fetchRates(formattedDate);

            if (ratesForDate && ratesForDate[targetCurrency]) {
                dateArray.push(formattedDate);
                rateArray.push(ratesForDate[targetCurrency]);
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }

        setHistoryRates(rateArray);
    };

    useEffect(() => {
        const fetchRatesBase = async () => {
            try {
                const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`);
                const data = await response.json();
                setRates(data[baseCurrency]);
            } catch (error) {
                console.error('Error fetching exchange rates:', error);
            }
        };

        fetchRatesBase();
        fetchHistoricalData();
    }, [baseCurrency]);

    useEffect(() => {
        if (rates[targetCurrency]) {
            const rate = rates[targetCurrency];
            const result = (amount * rate).toFixed(3);
            setConvertedAmount(result);
        } else {
            setConvertedAmount('해당 통화는 지원되지 않습니다.');
        }
    }, [amount, baseCurrency, targetCurrency, rates]);

    useEffect(() => {
        fetchHistoricalData();
    }, [baseCurrency, targetCurrency]);

    useEffect(() => {
        fetchCurrencies();
        setEndDate(getTodayDateMinusOne());
    }, []);

    const filteredCurrencies = currencies.filter(currency => allowedCurrencies.includes(currency));

    const data = {
        labels: historyRates.map((_, index) => new Date(startDate).toISOString().split('T')[0]),
        datasets: [
            {
                label: `${baseCurrency.toUpperCase()} to ${targetCurrency.toUpperCase()} exchange rate`,
                data: historyRates,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `${baseCurrency.toUpperCase()} to ${targetCurrency.toUpperCase()} Exchange Rate from ${startDate} to ${endDate}`,
            },
        },
    };

    return (
        <div className='bg-color' style={{ minHeight: '100vh' }}>
            <Navbar />
            <h2 className='font-size'>Currency Converter & Exchange Rate Graph</h2>
            <div className="currency-picker">
                <label>Base Currency: </label>
                <select
                    value={baseCurrency}
                    onChange={(e) => setBaseCurrency(e.target.value)}
                >
                    {filteredCurrencies.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency.toUpperCase()}
                        </option>
                    ))}
                </select>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>Target Currency: </label>
                <select
                    value={targetCurrency}
                    onChange={(e) => setTargetCurrency(e.target.value)}
                >
                    {filteredCurrencies.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>


            <div className='convert_content'>
                <label className='currency-picker'>Amount in {baseCurrency.toUpperCase()}: </label>
                <div className="input-wrapper">
                    <input
                        className='make-center'
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                
                {convertedAmount && (
                    <div className="converted_result">
                        <h3>{amount} {baseCurrency.toUpperCase()} = {convertedAmount} {targetCurrency.toUpperCase()}</h3>
                    </div>
                )}
            </div>
            {(
                <div className='chart-container'>
                    <Line data={data} options={options} />
                </div>
            )}
        </div>
    );
};

export default Dashboard;