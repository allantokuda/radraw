import React from 'react'
import { connect } from 'react-redux'
import ChartNode from './ChartNode'
import Arrow from './Arrow'
import { arrowId } from './reducers/arrows'

let PrecedenceChart = ({ state, dispatch }) => {
  let handleChartClick = (event, a, b) => {
    if (event.target.className !== 'precedenceChart') return
    let x = event.clientX - event.target.getBoundingClientRect()['x']
    let y = event.clientY - event.target.getBoundingClientRect()['y']
    if (state.editor.action === 'new_relation') {
      dispatch({ type: 'CREATE_RELATION', x, y: y - 55 })
    } else if (state.editor.action === 'connect' || state.editor.action === 'select') {
      dispatch({ type: 'DESELECT_ALL' })
    }
  }

  let isSelectedArrow = (arrow) => {
    return state.editor.selection.indexOf(arrowId(arrow)) !== -1
  }

  return <div className="precedenceChart" onClick={handleChartClick}>
    {false && <pre id='statewatch'>{ JSON.stringify(state, null, 2) }</pre> }

    {state.nodes.map(node => {
      const relation = state.relations.find(relation => relation.id === node.resultRelationId)
      return <ChartNode key={node.id} node={node} relation={relation} />
    })}
    {state.arrows.map(arrow => (
      <Arrow {...arrow}
        key={arrowId(arrow)}
        selected={isSelectedArrow(arrow)}/>
    ))}
  </div>
}

PrecedenceChart = connect(state => ({state}))(PrecedenceChart);

export default PrecedenceChart
