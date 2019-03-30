import React from 'react'
import { connect } from 'react-redux'
import OperatorButton from './OperatorButton'

let newRelation = () => {
  
}

let Toolbar = ({ state }) => (
  <header className="toolbar">
    <button onClick={newRelation}>
      <div className="relationButtonIcon">New Relation</div>
    </button>
    {state.editor.allowedOperations.map(operator => <OperatorButton key={operator.type} {...operator}/>)}
  </header>
)

Toolbar = connect(state => ({state}))(Toolbar);

export default Toolbar
