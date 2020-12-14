import React from 'react'
import classNames from 'classnames'
import { connect, useDispatch } from 'react-redux'
import OperatorButton from './OperatorButton'
import * as actions from './actions'
import operators from './operators'
import { flip } from './operatorShape'
import FileMenu from './FileMenu'

let Toolbar = ({ state }) => {
  const dispatch = useDispatch()
  let newRelation = () => { dispatch(actions.newRelationMode()) }

  let deleteRelation = () => {
    let confirmed = window.confirm('This will delete the selected item(s).')
    if (confirmed) {
      dispatch(actions.deleteSelected())
    }
  }

  let flipOperator = () => { dispatch(actions.flipOperator()) }

	let toggleDataPane = () => { dispatch(actions.toggleDataPane()) }
	const dataButtonLabel = (state.editor.dataPane ? 'Hide' : 'Show') + ' Data'

  const selectedNodes = state.nodes.filter(node => node.selected)
  const selectedArrows = state.arrows.filter(arrow => arrow.selected)
  const selectionSize = selectedNodes.length + selectedArrows.length
  let flippable
  if (selectedNodes.length === 1) {
    let selectedNode = selectedNodes[0]
    flippable = selectedNode && selectedNode.operator && selectedNode.operator.shape && flip(selectedNode.operator.shape)
  } else {
    flippable = false
  }

  return (
    <header className="toolbar">
      <FileMenu/>

      { selectionSize === 0 &&
        <button onClick={newRelation} className={classNames({ operatorButton: true, selected: state.editor.action === 'new_relation' })}>
          <div className="buttonContents">
            <div className="relation" aria-hidden={true} style={{ boxSizing: 'border-box', height: '25px', width: '50px', padding: 1, margin: '5px 0' }}>
              &#10133;
            </div>
            <label className="">New Relation</label>
          </div>
        </button>
      }

      { selectionSize >= 1 &&
        <button onClick={deleteRelation} className="operatorButton">
          <span className="buttonContents">
            <div className="relation" aria-hidden={true} style={{ background: '#fcc', borderColor: '#c99', color: 'black', boxSizing: 'border-box', height: '25px', width: '50px', padding: 1, margin: '5px 0' }}>
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
          operator.numInputs === selectedNodes.length
        ).map(operator =>
          <OperatorButton key={operator.type} {...operator}/>
        )
      }

      { localStorage.getItem('datapane') &&
        <button onClick={toggleDataPane} className="operatorButton" style={{ marginLeft: 'auto' }}>
            <span className="buttonContents">
              <div aria-hidden={true} style={{ fontSize: 30, color: 'white', height: '25px', width: '50px', padding: 4, margin: '-6px 0 8px' }}>
                &#9638;
              </div>
              <label className="">{dataButtonLabel}</label>
            </span>
        </button>
      }
    </header>
  )
}

Toolbar = connect(state => ({state}))(Toolbar);

export default Toolbar
