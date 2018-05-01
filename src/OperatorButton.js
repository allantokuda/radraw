import React from 'react'
import { polygonPoints } from './operatorShape'

const iconWidth = 40
const iconHeight = 35
const buttonWidth = iconWidth + 20
const buttonHeight = iconHeight + 40

const buttonStyle = { width: buttonWidth, height: buttonHeight }
const iconStyle = { width: iconWidth, height: iconHeight }

export default ({ category, type, shape }) => (
  <div className="operatorButton" style={buttonStyle}>
    <svg className="operatorShape" style={iconStyle}>
      <g transform={"translate(" + (iconWidth / 2) + ",0)"}>
        <polygon points={polygonPoints({ shape: shape, width: iconWidth, height: iconHeight })}/>
      </g>
    </svg>
    <label>{ type }</label>
  </div>
)
