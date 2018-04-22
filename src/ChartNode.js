import React from 'react'
import { connect } from 'react-redux'
import { renameNode } from './actions'

let ChartNode = ({ node, dispatch }) => {
  const handleEditName = (event) => {
    dispatch(renameNode(node.id, event.target.value))
  }

  return (
    <div className="operator">
      <input name="name" value={node.relation.name} onChange={handleEditName}/>
      <svg className="handle" height="100" width="100">
        <polygon points="0,0, 100,20 100,100 0,100" />
      </svg>
    </div>
  )
}

ChartNode = connect()(ChartNode)

export default ChartNode
