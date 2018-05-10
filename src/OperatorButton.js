import React from 'react'
import { svgShape } from './operatorShape'

const iconWidth = 40
const iconHeight = 35
const buttonWidth = iconWidth + 20
const buttonHeight = iconHeight + 40

const buttonStyle = { width: buttonWidth, height: buttonHeight }

export default ({ category, type, shape }) => (
  <div className="operatorButton" style={buttonStyle}>
    {svgShape({ shape: shape, width: iconWidth, height: iconHeight })}
    <label>{ type }</label>
  </div>
)
