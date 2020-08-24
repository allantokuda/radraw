import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'
import Draggable from 'react-draggable'
import * as actions from './actions'
import { svgShape } from './operatorShape'
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
    // and another to calculate the verticalOffset of the title of the half house based on the width.
    setTimeout(this.updateSize)
    setTimeout(this.updateSize)
  }

  render() {
    const { node, relation, state, dispatch } = this.props
    const operator = node.operator

    const handleEditName = (event) => {
      dispatch(actions.renameRelation(node.resultRelationId, event.target.value))
      setTimeout(this.updateSize)
    }

    const handleRelationFocus = (event) => {
      dispatch(actions.selectRelation(node.resultRelationId))
    }

    const handleRelationBlur = (event) => {
      dispatch(actions.deselectAll())
    }

    const handleEditParam = (paramName, event) => {
      dispatch(actions.updateOperatorParam(node.id, paramName, event.target.value))
      setTimeout(this.updateSize)
    }

    const handleDrag = (event, data) => {
      dispatch(actions.moveNode(node.id, data.deltaX, data.deltaY))
    }

    const handleClick = (relation) => {
      dispatch(actions.selectRelation(relation.id))
    }

    const verticalOffset = !!operator.type ? (operator.width || 100) * 0.1 + 20 : 0

    const svgParams = Object.assign({}, operator, { width: operator.width || 100, height: operator.height || 42, className: 'operatorShape centerBehind' })

    const relationClasses = classNames({
      relation: true,
      dragHandle: true,
      selected: state.editor.selectedRelationIds.indexOf(relation.id) > -1
    })

    return (
      <Draggable
        cancel=".noDrag"
        handle=".dragHandle"
        onDrag={handleDrag}
        position={{ x: node.x, y: node.y }}>

        <div ref={nodeRef => this.nodeRef = nodeRef} className="chartNode">
          <div className="operator">
            <div className="operatorContent bottomFix4 dragHandle"
                 style={{ paddingTop: verticalOffset, minWidth: 30, minHeight: 30 }}
                 ref={operatorRef => this.operatorRef = operatorRef}>

              <table>
                <tbody>
                  <tr>
                    <td colSpan="2" className="operatorName">{operator.type}</td>
                  </tr>
                  {Object.keys(operator.params || {}).map(param =>
                  <tr className="operatorParamRow" key={param}>
                    <td className="operatorParamLabel">{param}:&nbsp;</td>
                    <td>
                      <ContentEditable className="operatorParamValue noDrag"
                                       html={operator.params[param]}
                                       onChange={handleEditParam.bind(this, param)}/>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </div>
            {svgShape(svgParams)}
          </div>
          { operator.type && <div className="bottomFix4"><Arrow x1={0} y1={0} x2={0} y2={30} /></div> }
          <div className={relationClasses} onClick={handleClick.bind(this, relation)}>
            <ContentEditable className='noDrag relationEdit'
                             html={relation.name}
                             onChange={handleEditName}
                             onFocus={handleRelationFocus}
                             onBlur={handleRelationBlur}/>
          </div>
        </div>
      </Draggable>
    )
  }
}

ChartNode = connect(state => ({state}))(ChartNode)

export default ChartNode
