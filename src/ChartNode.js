import React from 'react'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'
import { renameNode } from './actions'
import RelationalOperator from './RelationalOperator'
import Arrow from './Arrow'

let ChartNode = ({ node, dispatch }) => {
  const handleEditName = (event) => {
    dispatch(renameNode(node.id, event.target.value))
  }

  return (
    <div className="chartNode">
      <RelationalOperator nodeId={node.id} operator={node.operator}/>
      <Arrow x1={0} y1={0} x2={0} y2={30} />
      <ContentEditable className="relation" html={node.relation.name} onChange={handleEditName}/>
    </div>
  )
}

ChartNode = connect()(ChartNode)

export default ChartNode
