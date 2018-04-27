import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'
import Draggable from 'react-draggable'
import { renameNode, moveNode, resizeNode } from './actions'
import RelationalOperator from './RelationalOperator'
import Arrow from './Arrow'

class ChartNode extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 100,
      height: 100
    }
  }

  updateSize = () => {
    let width = this.nodeRef.clientWidth
    let height = this.nodeRef.clientHeight
    this.props.dispatch(
      resizeNode(this.props.node.id, width, height)
    )
  }

  componentDidMount() {
    setTimeout(this.updateSize)
  }

  render() {
    let { node, dispatch } = this.props

    const handleEditName = (event) => {
      dispatch(renameNode(node.id, event.target.value))
      setTimeout(this.updateSize)
    }

    const handleDrag = (event) => {
      dispatch(moveNode(node.id, event.movementX, event.movementY))
    }

    const handleOperatorResize = () => {
      setTimeout(this.updateSize)
    }

    return (
      <Draggable handle=".handle" onDrag={handleDrag} position={{ x: node.x, y: node.y }}>
        <div ref={nodeRef => this.nodeRef = nodeRef} className="chartNode">
          <RelationalOperator nodeId={node.id} operator={node.operator} onResize={handleOperatorResize}/>
          <div><Arrow x1={0} y1={0} x2={0} y2={30} /></div>
          <ContentEditable className="relation" html={node.relation.name} onChange={handleEditName}/>
        </div>
      </Draggable>
    )
  }
}

ChartNode = connect()(ChartNode)

export default ChartNode
