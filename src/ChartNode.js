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
    const selected = node.selected

    const handleEditName = (event) => {
      dispatch(actions.renameRelation(node.resultRelationId, event.target.value))
      setTimeout(this.updateSize)
    }

    const handleEditType = (event) => {
      dispatch(actions.updateOperatorType(node.id, event.target.value))
      setTimeout(this.updateSize)
    }

    const handleEditParams = (event) => {
      dispatch(actions.updateOperatorParams(node.id, event.target.value))
      setTimeout(this.updateSize)
    }

    const handleDrag = (event, data) => {
      event.stopPropagation()
      dispatch(actions.moveNode(node.id, data.deltaX, data.deltaY))
    }

    const handleConnectionButtonClick = (connection, event) => {
      event.stopPropagation()
      dispatch(actions.initConnect(node.id, connection))
    }

    const handleOperatorClick = (event) => {
      event.stopPropagation()
      dispatch(actions.select(node.id, event.shiftKey))
    }

    const selectRelation = (toggleMode) => {
      if (state.editor.action === 'connect') {
        dispatch(actions.finishConnect(node.id))
      } else {
        dispatch(actions.select(node.id, toggleMode))
      }
    }

    const handleRelationClick = (event) => {
      event.stopPropagation()
      selectRelation(event.shiftKey)
    }

    const handleRelationTouchStart = (event) => {
      selectRelation(event.touches.length > 1)
    }

    const svgParams = Object.assign({}, operator, { width: operator.width || 100, height: operator.height || 42, className: 'operatorSvg underlay' })

    const inboundArrows = state.arrows.filter(arrow => arrow.to === node.id)
    const filledConnections = inboundArrows.map(arrow => arrow.connection)
    const openPoints = connectionPoints(operator).filter(point => filledConnections.indexOf(point.connection) === -1)

    return (
      <Draggable
        cancel=".noDrag"
        handle=".dragHandle"
        onDrag={handleDrag}
        position={{ x: node.x, y: node.y }}>

        <div ref={nodeRef => this.nodeRef = nodeRef} className={classNames({ chartNode: true, selected })}>
          <button className="keyboardSelectButton" aria-label={"Select: " + relation.name} onClick={handleOperatorClick.bind(this)}></button>

          <div className={"operator centeredOnZeroWidthParent " + operator.type} onClick={handleOperatorClick.bind(this)}>
            <div className="operatorContent bottomFix dragHandle"
                 style={{ paddingTop: titleY(operator), minWidth: 80, minHeight: 20 }}
                 ref={operatorRef => this.operatorRef = operatorRef}>

              { (operator.type || operator.shape) &&
                <ContentEditable className={classNames({ noDrag: selected, operatorName: true })}
                                 html={operator.type}
                                 disabled={!selected}
                                 onChange={handleEditType.bind(this)}/>
              }

              { operatorHasParams(operator.type) &&
                <ContentEditable className={classNames({ noDrag: selected, operatorParams: true })}
                                 html={operator.params || ''}
                                 tagName='pre'
                                 disabled={!selected}
                                 onChange={handleEditParams.bind(this)}/>
              }
            </div>
            {svgShape(svgParams)}
          </div>

          { operator.type && <div className="bottomFix"><Arrow x1={0} y1={0} x2={0} y2={30} /></div> }
          <div className="relation dragHandle centeredOnZeroWidthParent"
            ref={ref => this.relationRef = ref}
            onClick={handleRelationClick}
            onTouchStart={handleRelationTouchStart}
            onTouchEnd={e => e.preventDefault()} /* prevent click + touch events from both firing */
          >
            <ContentEditable className={classNames({ noDrag: selected, relationEdit: true })}
                             html={relation.name}
                             disabled={!selected}
                             onChange={handleEditName}/>
          </div>

          {openPoints.map((point) =>
            <button
              key={point.connection}
              className="missingInput"
              style={{marginLeft: point.x * 2, top: point.y}}
              onClick={handleConnectionButtonClick.bind(this, point.connection)}
              aria-label={"missing input " + (point.connection+1) + " to node " + node.id}
            >!</button>
          )}

        </div>
      </Draggable>
    )
  }
}

ChartNode = connect(state => ({state}))(ChartNode)

export default ChartNode
