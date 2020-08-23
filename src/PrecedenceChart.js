import React from 'react'
import { connect } from 'react-redux'
import ChartNode from './ChartNode'
import Arrow from './Arrow'
import * as actions from './actions'

let PrecedenceChart = ({ state, dispatch }) => {
  let handleChartClick = (event, a, b) => {
    if (event.target.className !== 'precedenceChart') return
    let x = event.clientX - event.target.getBoundingClientRect()['x']
    let y = event.clientY - event.target.getBoundingClientRect()['y']

    if (state.editor.action == 'new_relation') {
      dispatch({ type: 'CREATE_RELATION', x, y })
    }
  }

  return <div className="precedenceChart" onClick={handleChartClick}>
    {state.nodes.map(node => {
      const relation = state.relations.find(relation => relation.id === node.resultRelationId)
      return <ChartNode key={node.id} node={node} relation={relation} />
    })}
    {state.arrows.map(arrow => <Arrow {...arrow} key={arrow.from + '-' + arrow.to} />)}
  </div>
}

PrecedenceChart = connect(state => ({state}))(PrecedenceChart);

export default PrecedenceChart
