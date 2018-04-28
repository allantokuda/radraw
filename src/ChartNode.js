import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'
import Draggable from 'react-draggable'
import { renameNode, moveNode, resizeNode, updateOperatorParam } from './actions'
import { polygonPoints } from './operatorShape'
import Arrow from './Arrow'

class ChartNode extends Component {

  updateSize = () => {
    let nodeHeight = this.nodeRef.clientHeight
    let operatorWidth = this.operatorRef.clientWidth
    let operatorHeight = this.operatorRef.clientHeight
    this.props.dispatch(
      resizeNode(this.props.node.id, nodeHeight, operatorWidth, operatorHeight)
    )
  }

  componentDidMount() {
    setTimeout(this.updateSize)
  }

  render() {
    const { node, dispatch } = this.props
    const operator = node.operator

    const handleEditName = (event) => {
      dispatch(renameNode(node.id, event.target.value))
      setTimeout(this.updateSize)
    }

    const handleEditParam = (paramName, event) => {
      dispatch(updateOperatorParam(node.id, paramName, event.target.value))
      setTimeout(this.updateSize)
    }

    const handleDrag = (event) => {
      dispatch(moveNode(node.id, event.movementX, event.movementY))
    }

    const verticalOffset = operator.width * 0.1 + 20 || 0

    return (
      <Draggable cancel=".noDrag" onDrag={handleDrag} position={{ x: node.x, y: node.y }}>
        <div ref={nodeRef => this.nodeRef = nodeRef} className="chartNode">
          <div className="operator">
            <div className="operatorContent"
                 style={{ paddingTop: verticalOffset }}
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
            <svg className="operatorShape" width={operator.width || 100} height={(operator.height || 20) + 22}>
              <g transform={"translate(" + (operator.width || 100) / 2 + ",0)"}>
                {operator.type ? <polygon points={polygonPoints(operator)} />
                               : <circle cx="0" cy="50%" r="20" />
                }
              </g>
            </svg>
          </div>
          <div><Arrow x1={0} y1={0} x2={0} y2={30} /></div>
          <ContentEditable className="relation noDrag" html={node.relation.name} onChange={handleEditName}/>
        </div>
      </Draggable>
    )
  }
}

ChartNode = connect()(ChartNode)

export default ChartNode