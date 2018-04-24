import React from 'react'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'
import operatorShape from './operatorShape'
import { updateOperatorParam } from './actions'

let RelationalOperator = ({ nodeId, operator, dispatch }) => {
  const charWidth = Math.max(
    operator.params && operator.params.Aid.length,
    operator.params && operator.params.Bid.length
  )

  const width = Math.max(Math.min(charWidth * 8.0 + 50, 200), 120);
  const height = Math.max(charWidth * 0.85 + 120, 100);

  const shapeSvg = operator.type ? (
    <svg height={height} width={width}>
      <polygon points={operatorShape(operator.shape, width, height)} />
    </svg>
  ) : null

  const updateParam = (paramName, event) => {
    dispatch(updateOperatorParam(nodeId, paramName, event.target.value))
  }

  const operatorParams = Object.keys(operator.params || {})

  return (
    <div className="operator">
      <table className="operatorContent">
        <tbody>
          <tr>
            <td colSpan="2" className="operatorName">{operator.type}</td>
          </tr>
          {operatorParams.map(param => <tr className="operatorParamRow" key={param}>
            <td className="operatorParamLabel">{param}:&nbsp;</td>
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

RelationalOperator = connect()(RelationalOperator)

export default RelationalOperator
