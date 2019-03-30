import React from 'react'
import { connect } from 'react-redux'
import OperatorButton from './OperatorButton'

let Toolbar = ({ state }) => (
  <header className="toolbar">
    {state.editor.allowedOperations.map(operator => <OperatorButton key={operator.type} {...operator}/>)}
  </header>
)

Toolbar = connect(state => ({state}))(Toolbar);

export default Toolbar
