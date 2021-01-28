import React, { useEffect, useState } from 'react'
import './App.css'
import InputOutput from './InputOutput'

const BASE_URL = 'https://api.exchangeratesapi.io/latest'

const App = () => {

    const [options, setOptions] = useState([])
    const [fromCurr, setFromCurr] = useState()
    const [toCurr, setToCurr] = useState()
    const [exchangeRate, setExchangeRate] = useState(1)
    const [amount, setAmount] = useState(1)
    const [fromAmount, setFromAmount] = useState(true)

    const [topAmount, bottomAmount] = fromAmount ? [amount, amount * exchangeRate] : [amount / exchangeRate, amount]

    useEffect(() => {
        fetch(BASE_URL)
        .then(res => res.json())
        .then(data => {
            const secondCurrency = Object.keys(data.rates)[0]
            setOptions([data.base, ...Object.keys(data.rates)])
            setFromCurr(data.base)
            setToCurr(secondCurrency)
            setExchangeRate(data.rates[secondCurrency])
        })
    }, [])

    useEffect(() => {
        if(fromCurr != null && toCurr != null) {
            fetch(BASE_URL + '?base=' + fromCurr + '&symbols=' + toCurr)
                .then(res => res.json())
                .then(data => setExchangeRate(data.rates[toCurr]))
        }
    }, [fromCurr, toCurr])

    const onChangeAmount = (e, x) => {
        setAmount(e.target.value)
        setFromAmount(x)
    }

    return (
        <div>
            <h1>Convert</h1>
            <InputOutput 
                options={options}
                selectedCurr={fromCurr}
                onChangeCurr={e => setFromCurr(e.target.value)}
                amount={topAmount}
                onChangeAmount={e => onChangeAmount(e, true)}
            />
            <div className="equals">=</div>
            <InputOutput 
                options={options}
                selectedCurr={toCurr}
                onChangeCurr={e => setToCurr(e.target.value)}
                amount={bottomAmount}
                onChangeAmount={e => onChangeAmount(e, false)}
            />
        </div>
    )
}

export default App
