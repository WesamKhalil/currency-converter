import React from 'react'
import './App.css'
import InputOutput from './InputOutput'

const App = () => {
    return (
        <div>
            <h1>Convert</h1>
            <InputOutput />
            <div className="equals">=</div>
            <InputOutput />
        </div>
    )
}

export default App
