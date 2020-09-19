import React from 'react'
import { connect } from 'react-redux'
import Toolbar from './Toolbar'
import PrecedenceChart from './PrecedenceChart'
import './App.css'

let App = ({ state }) => (
  <div className="App">
    <Toolbar />
    <PrecedenceChart />
    <pre id='statewatch'>{ JSON.stringify(state, null, 2) }</pre>
  </div>
)

App = connect(state => ({state}))(App);

export default App
