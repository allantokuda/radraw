import React from 'react'
import classNames from 'classnames'
import { connect, useDispatch } from 'react-redux'
import OperatorButton from './OperatorButton'
import * as actions from './actions'
import operators from './operators'

let Toolbar = ({ state }) => {
  const dispatch = useDispatch()
  let newRelation = () => { dispatch(actions.newRelationMode()) }
  let deleteRelation = () => { dispatch(actions.deleteSelected()) }

  return (
    <header className="toolbar">
      <button onClick={newRelation} className={classNames({ operatorButton: true, selected: state.editor.action === 'new_relation' })}>
        <div className="buttonContents">
          <div className="relation" aria-hidden={true} style={{ boxSizing: 'border-box', height: '25px', width: '50px', padding: 4, margin: '5px 0' }}>
            &#10133;
          </div>
          <label className="">New Relation</label>
        </div>
      </button>
      { state.editor.selectedRelationNodeIds.length === 1 &&
      <button onClick={deleteRelation} className={classNames({ operatorButton: true })}>
        <span className="buttonContents">
          <div className="relation" aria-hidden={true} style={{ background: '#fcc', borderColor: '#c99', color: 'black', boxSizing: 'border-box', height: '25px', width: '50px', padding: 4, margin: '5px 0' }}>
            &#10060;
          </div>
          <label className="">Delete</label>
        </span>
      </button>
      }
      {
        operators.filter(operator =>
          operator.numInputs === state.editor.selectedRelationNodeIds.length
        ).map(operator =>
          <OperatorButton key={operator.type} {...operator}/>
        )
      }
    </header>
  )
}

Toolbar = connect(state => ({state}))(Toolbar);

export default Toolbar
