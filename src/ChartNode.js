import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'
import Draggable from 'react-draggable'
import { renameNode, moveNode, resizeNode, updateOperatorParam } from './actions'
import operatorShape from './operatorShape'
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
      <Draggable handle=".handle" onDrag={handleDrag} position={{ x: node.x, y: node.y }}>
        <div ref={nodeRef => this.nodeRef = nodeRef} className="chartNode">
          <div className="operator">
            <div className="operatorContent"
                 style={{ paddingTop: verticalOffset }}
                 ref={operatorRef => this.operatorRef = operatorRef}>

              <table>
                <tbody>
                  <tr className="handle">
                    <td colSpan="2" className="operatorName">{operator.type}</td>
                  </tr>
                  {Object.keys(operator.params || {}).map(param =>
                  <tr className="operatorParamRow" key={param}>
                    <td className="operatorParamLabel handle">{param}:&nbsp;</td>
                    <td>
                      <ContentEditable className="operatorParamValue"
                                       html={operator.params[param]}
                                       onChange={handleEditParam.bind(this, param)}/>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </div>
            <svg className="operatorShape handle" width={operator.width || 100} height={(operator.height || 20) + 22}>
              {operator.type ? <polygon points={operatorShape(operator)} />
                             : <circle cx="50%" cy="50%" r="20" />
              }
            </svg>
          </div>
          <div><Arrow x1={0} y1={0} x2={0} y2={30} /></div>
          <ContentEditable className="relation" html={node.relation.name} onChange={handleEditName}/>
        </div>
      </Draggable>
    )
  }
}

ChartNode = connect()(ChartNode)

export default ChartNode
