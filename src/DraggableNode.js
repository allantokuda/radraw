import React from 'react'
import Draggable from 'react-draggable'

const DraggableNode = (props) => (
  <Draggable handle=".handle">
    <div className="operator">
      <input name="name" value={props.data.relation.name} onChange={props.onChange}/>
      <svg className="handle" height="100" width="100">
        <polygon points="0,0, 100,20 100,100 0,100" />
      </svg>
    </div>
  </Draggable>
)

export default DraggableNode
