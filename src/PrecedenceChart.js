import React from 'react'
import { connect } from 'react-redux'
import ChartNode from './ChartNode'
import Arrow from './Arrow'

let PrecedenceChart = ({ state }) => {
  return <div className="precedenceChart">
    {state.nodes.map(node => {
      const relation = state.relations.find(relation => relation.id === node.resultRelationId)
      return <ChartNode key={node.id} node={node} relation={relation} />
    })}
    {state.arrows.map(arrow => <Arrow {...arrow} key={arrow.from + '-' + arrow.to} />)}
  </div>
}

PrecedenceChart = connect(state => ({state}))(PrecedenceChart);

export default PrecedenceChart
