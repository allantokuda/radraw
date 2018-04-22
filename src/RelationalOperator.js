import React from 'react'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'
import operatorShape from './operatorShape'
import { updateOperatorParam } from './actions'

let RelationalOperator = ({ nodeId, operator, dispatch }) => {
  const shapeSvg = operator.type ? (
    <svg height="100" width="100">
      <polygon points={operatorShape(operator.shape, 100)} />
    </svg>
  ) : null

  const updateParam = (paramName, event) => {
    dispatch(updateOperatorParam(nodeId, paramName, event.target.value))
  }

  return (
    <div className="operator">
      <span className="operatorContent">
        <div>{operator.type}</div>
        {operator.params && Object.keys(operator.params).map(param => (
          <div key={param}>
            <span>{param}</span>: <ContentEditable className="operator-param" html={operator.params[param]} onChange={updateParam.bind(this, param)}/>
          </div>
        ))}
        <div>{operator.text}</div>
      </span>
      {shapeSvg}
    </div>
  )
}

RelationalOperator = connect()(RelationalOperator)

export default RelationalOperator
