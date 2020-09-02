import React from 'react'
import { connect } from 'react-redux'
import Toolbar from './Toolbar'
import PrecedenceChart from './PrecedenceChart'
import './App.css'

let App = ({ state }) => (
  <div className="App">
    <Toolbar />
    <PrecedenceChart />
    <div>{ JSON.stringify(state) }</div>
  </div>
)

App = connect(state => ({state}))(App);

export default App
