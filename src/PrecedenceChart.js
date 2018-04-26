import React from 'react'
import { connect } from 'react-redux'
import ChartNode from './ChartNode'
import Arrow from './Arrow'

let PrecedenceChart = ({ state }) => {
  return <div className="precedenceChart">
    {state.nodes.map(node => <ChartNode key={node.id} node={node} />)}
    {state.arrows.map(arrow => <Arrow {...arrow} key={arrow.from + '-' + arrow.to} />)}
  </div>
}

PrecedenceChart = connect(state => ({state}))(PrecedenceChart);

export default PrecedenceChart
