import React, { Component } from 'react'
import PrecedenceChart from './PrecedenceChart.js'
import './App.css'
import { createStore } from 'redux'

class App extends Component {
  constructor() {
    super()

    this.state = {
      text: 'example'
    }
  }

  handleChange(event) {
    this.setState({ text: event.target.value })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          radraw
        </header>
        <PrecedenceChart />
      </div>
    )
  }
}

export default App
