import React from 'react'
import { connect } from 'react-redux'
import PrecedenceChart from './PrecedenceChart.js'
import './App.css'

let App = ({ state }) => (
  <div className="App">
    <header className="App-header">
      {state.editor.allowedOperations.map(operator => <span key={operator.type}>{ operator.type } </span>)}
    </header>
    <PrecedenceChart />
  </div>
)

App = connect(state => ({state}))(App);

export default App
