import React from 'react'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'
import { renameNode } from './actions'

let ChartNode = ({ node, dispatch }) => {
  const handleEditName = (event) => {
    dispatch(renameNode(node.id, event.target.value))
  }

  return (
    <div className="node">
      <div className="operator">
        <svg height="100" width="100">
          <polygon points="0,0, 100,20 100,100 0,100" />
        </svg>
      </div>
      <ContentEditable className="relation" html={node.relation.name} onChange={handleEditName}/>
    </div>
  )
}

ChartNode = connect()(ChartNode)

export default ChartNode
