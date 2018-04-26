import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'
import operatorShape from './operatorShape'
import { updateOperatorParam } from './actions'

class RelationalOperator extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 100,
      height: 100
    }
  }

  updateSize = () => {
    let width = this.contentRef.clientWidth
    let height = this.contentRef.clientHeight
    this.setState({ width, height })
  }

  componentDidMount() {
    this.updateSize()
  }

  render() {
    let { nodeId, operator, dispatch } = this.props

    const width = Math.max(Math.min(this.state.width, 200), 80) + 10;
    const height = Math.max(this.state.height + 30, 100);
    const paddingTop = width * 0.1;

    const shapeSvg = operator.type ? (
      <svg className="handle" height={height} width={width+10}>
        <polygon points={operatorShape(operator.shape, width+10, height)} />
      </svg>
    ) : null

    const updateParam = (paramName, event) => {
      dispatch(updateOperatorParam(nodeId, paramName, event.target.value))
      setTimeout(this.updateSize)
    }

    const operatorParams = Object.keys(operator.params || {})

    return (
      <div className="operator">
        <table className="operatorContent"
               style={{ paddingTop }}
               ref={(contentRef) => this.contentRef = contentRef}>
          <tbody>
            <tr className="handle">
              <td colSpan="2" className="operatorName">{operator.type}</td>
            </tr>
            {operatorParams.map(param => <tr className="operatorParamRow" key={param}>
              <td className="operatorParamLabel handle">{param}:&nbsp;</td>
              <td>
                <ContentEditable className="operatorParamValue"
                                 html={operator.params[param]}
                                 onChange={updateParam.bind(this, param)}/>
              </td>
            </tr>)}
          </tbody>
        </table>
        {shapeSvg}
      </div>
    )
  }
}

RelationalOperator = connect()(RelationalOperator)

export default RelationalOperator
