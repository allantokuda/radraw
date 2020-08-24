import React from 'react'
import classNames from 'classnames'
import { connect, useDispatch } from 'react-redux'
import OperatorButton from './OperatorButton'
import * as actions from './actions'
import operators from './operators'

let Toolbar = ({ state }) => {
  const dispatch = useDispatch()
  let newRelation = () => {
    dispatch(actions.newRelationMode())
  }

  return (
    <header className="toolbar">
      <button onClick={newRelation} className={classNames({ selected: state.editor.action === 'new_relation' })}>
        <div className="">New Relation</div>
      </button>
      {operators.map(operator => <OperatorButton key={operator.type} {...operator}/>)}
    </header>
  )
}

Toolbar = connect(state => ({state}))(Toolbar);

export default Toolbar
