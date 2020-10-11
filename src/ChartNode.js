import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'
import Draggable from 'react-draggable'
import * as actions from './actions'
import { svgShape, titleY, connectionPoints } from './operatorShape'
import { operatorHasParams } from './operators'
import Arrow from './Arrow'
import classNames from 'classnames'

class ChartNode extends Component {

  updateSize = () => {
    let nodeHeight = this.nodeRef.clientHeight
    let operatorWidth = this.operatorRef.clientWidth
    let operatorHeight = this.operatorRef.clientHeight
    this.props.dispatch(
      actions.resizeNode(this.props.node.id, nodeHeight, operatorWidth, operatorHeight)
    )
  }

  componentDidMount() {
    // Two initial sizing renders needed: one to set the width of the half-house shape based on text content,
    // and another to calculate the titleY (verticalOffset of the title) based on the operator width.
    setTimeout(this.updateSize)
    setTimeout(this.updateSize)
  }

  render() {
    const { node, relation, state, dispatch } = this.props
    const operator = node.operator
    const selected = state.editor.selectedRelationNodeIds.indexOf(node.id) > -1

    const handleEditName = (event) => {
      dispatch(actions.renameRelation(node.resultRelationId, event.target.value))
      setTimeout(this.updateSize)
    }

    const handleEditParams = (event) => {
      dispatch(actions.updateOperatorParams(node.id, event.target.value))
      setTimeout(this.updateSize)
    }

    const handleDrag = (event, data) => {
      dispatch(actions.moveNode(node.id, data.deltaX, data.deltaY))
    }

    const initConnect = (connection, event) => {
      dispatch(actions.initConnect(node.id, connection))
    }

    const handleOperatorClick = (event) => {
      selectNode(event.shiftKey)
    }

    const handleRelationClick = (event) => {
      if (state.editor.action === 'connect') {
        dispatch(actions.finishConnect(node.id))
      } else {
        selectNode(event.shiftKey)
      }
    }

    const selectNode = (toggleMode) => {
      if (toggleMode) {
        dispatch(actions.toggleSelectRelation(node.id))
      } else {
        dispatch(actions.selectRelation(node.id))
      }
    }

    const handleContentEditableClick = (event) => {
      // keep node selected, don't deselect
      if (selected) event.stopPropagation()
    }

    const svgParams = Object.assign({}, operator, { width: operator.width || 100, height: operator.height || 42, className: 'operatorSvg underlay' })

    const inboundArrows = state.arrows.filter(arrow => arrow.to === node.id)
    const filledConnections = inboundArrows.map(arrow => arrow.connection)
    const openPoints = connectionPoints(operator).filter((point, i) => filledConnections.indexOf(i) === -1)

    return (
      <Draggable
        cancel=".noDrag"
        handle=".dragHandle"
        onDrag={handleDrag}
        position={{ x: node.x, y: node.y }}>

        <div ref={nodeRef => this.nodeRef = nodeRef} className={classNames({ chartNode: true, selected })}>
          {openPoints.map((point, i) =>
            <button
              key={i}
              className="missingInput"
              style={{marginLeft: point.x * 2, top: point.y}}
              onClick={initConnect.bind(this, i)}
              aria-label={"missing input " + (i+1) + " to node " + node.id}
            >!</button>
          )}

          <div className={"operator centeredOnZeroWidthParent " + operator.type} onClick={handleOperatorClick.bind(this)}>
            <div className="operatorContent bottomFix dragHandle"
                 style={{ paddingTop: titleY(operator), minWidth: 80, minHeight: 20 }}
                 ref={operatorRef => this.operatorRef = operatorRef}>

              <div className="operatorName">{operator.type}</div>
              { operatorHasParams(operator.type) &&
                <ContentEditable className={classNames({ noDrag: selected, operatorParams: true })}
                                 html={operator.params}
                                 tagName='pre'
                                 disabled={!selected}
                                 onClick={handleContentEditableClick}
                                 onChange={handleEditParams.bind(this)}/>
              }
            </div>
            {svgShape(svgParams)}
          </div>
          { operator.type && <div className="bottomFix"><Arrow x1={0} y1={0} x2={0} y2={30} /></div> }
          <button className="relation dragHandle centeredOnZeroWidthParent" ref={ref => this.relationRef = ref} onClick={handleRelationClick.bind(this)}>
            <ContentEditable className={classNames({ noDrag: selected, relationEdit: true })}
                             html={relation.name}
                             disabled={!selected}
                             onClick={handleContentEditableClick}
                             onChange={handleEditName}/>
          </button>
        </div>
      </Draggable>
    )
  }
}

ChartNode = connect(state => ({state}))(ChartNode)

export default ChartNode
