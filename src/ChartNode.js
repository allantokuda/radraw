import React from 'react'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'
import { renameNode } from './actions'
import RelationalOperator from './RelationalOperator'

let ChartNode = ({ node, dispatch }) => {
  const handleEditName = (event) => {
    dispatch(renameNode(node.id, event.target.value))
  }

  return (
    <div className="node">
      <RelationalOperator nodeId={node.id} operator={node.operator}/>
      <ContentEditable className="relation" html={node.relation.name} onChange={handleEditName}/>
    </div>
  )
}

ChartNode = connect()(ChartNode)

export default ChartNode
