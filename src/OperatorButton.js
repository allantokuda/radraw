import React from 'react'
import { useDispatch } from 'react-redux'
import { svgShape } from './operatorShape'
import * as actions from './actions'

const iconWidth = 40
const iconHeight = 35

export default ({ category, type, shape }) => {
  const dispatch = useDispatch()
  let handleClick = () => {
    dispatch(actions.addOperator(type))
  }
  return (
    <button className="operatorButton" onClick={handleClick}>
      <span className="iconContainer">
        {svgShape({ shape: shape, width: iconWidth, height: iconHeight })}
      </span>
      <label>{ type }</label>
    </button>
  )
}
