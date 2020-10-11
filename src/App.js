import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Toolbar from './Toolbar'
import PrecedenceChart from './PrecedenceChart'
import './App.css'
import './z-index.css'

let App = ({ state }) => {
  let classNamesObj = { App: true }
  classNamesObj[state.editor.action] = true

  return (
    <div className={classNames(classNamesObj)}>
      <Toolbar />
      <PrecedenceChart />
    </div>
  )
}

App = connect(state => ({state}))(App);

export default App
