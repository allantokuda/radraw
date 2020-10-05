import React from 'react'
import classNames from 'classnames'
import { connect, useDispatch } from 'react-redux'
import OperatorButton from './OperatorButton'
import * as actions from './actions'
import operators from './operators'
import { flip } from './operatorShape'

let Toolbar = ({ state }) => {
  const dispatch = useDispatch()
  let newRelation = () => { dispatch(actions.newRelationMode()) }
  let deleteRelation = () => { dispatch(actions.deleteSelected()) }
  let flipOperator = () => { dispatch(actions.flipOperator()) }

  const ids = state.editor.selectedRelationNodeIds
  const oneNode = ids.length === 1
  let flippable
  if (oneNode) {
    let selectedNode = state.nodes.find(node => node.id === ids[0])
    flippable = selectedNode && selectedNode.operator && selectedNode.operator.shape && flip(selectedNode.operator.shape)
  } else {
    flippable = false
  }

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
        <button onClick={deleteRelation} className="operatorButton">
          <span className="buttonContents">
            <div className="relation" aria-hidden={true} style={{ background: '#fcc', borderColor: '#c99', color: 'black', boxSizing: 'border-box', height: '25px', width: '50px', padding: 4, margin: '5px 0' }}>
              &#10060;
            </div>
            <label className="">Delete</label>
          </span>
        </button>
      }

      { flippable &&
        <button onClick={flipOperator} className="operatorButton">
          <span className="buttonContents">
            <div aria-hidden={true} style={{ fontSize: 30, color: 'white', height: '25px', width: '50px', padding: 4, margin: '5px 0' }}>
              &#8646;
            </div>
            <label className="">Flip</label>
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
