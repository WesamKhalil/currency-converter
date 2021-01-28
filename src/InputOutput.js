import React from 'react'

const InputOutput = ({options, selectedCurr, onChangeCurr, amount, onChangeAmount}) => {
    return (
        <div>
            <input type="number" className="input" value={amount} onChange={onChangeAmount}/>
            <select value={selectedCurr} onChange={onChangeCurr}>
                {options.map(val => (
                    <option key={val} value={val}>{val}</option>
                ))}
            </select>
        </div>
    )
}

export default InputOutput
