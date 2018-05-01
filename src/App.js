import React from 'react'
import { connect } from 'react-redux'
import PrecedenceChart from './PrecedenceChart'
import OperatorButton from './OperatorButton'
import './App.css'

let App = ({ state }) => (
  <div className="App">
    <header className="toolbar">
      {state.editor.allowedOperations.map(operator => <OperatorButton key={operator.type} {...operator}/>)}
    </header>
    <PrecedenceChart />
  </div>
)

App = connect(state => ({state}))(App);

export default App
