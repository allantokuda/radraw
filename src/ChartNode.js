import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'
import Draggable from 'react-draggable'
import * as actions from './actions'
import { svgShape, titleY } from './operatorShape'
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

    const handleRelationClick = (node, event) => {
      if (event.shiftKey) {
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

    return (
      <Draggable
        cancel=".noDrag"
        handle=".dragHandle"
        onDrag={handleDrag}
        position={{ x: node.x, y: node.y }}>

        <div ref={nodeRef => this.nodeRef = nodeRef} className={classNames({ chartNode: true, selected })}>
          <div className={"operator centeredOnZeroWidthParent " + operator.type} onClick={handleRelationClick.bind(this, node)}>
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
          <button className="relation dragHandle centeredOnZeroWidthParent" ref={ref => this.relationRef = ref} onClick={handleRelationClick.bind(this, node)}>
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
