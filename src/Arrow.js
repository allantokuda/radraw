import React from 'react'

const Arrow = ({ x1, y1, x2, y2 }) => {

  const length = Math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
  const arrowDx = 10
  const arrowDy = 4

  const arrowPoints = [[length - arrowDx, 0], [length, arrowDy], [length - arrowDx, arrowDy * 2]].map(point => point.join(',')).join(' ')

  const svgStyle = {
    width: length,
    height: arrowDy * 2,
    left: (x2 + x1) / 2 - length / 2,
    top: (y2 + y1) / 2 - arrowDy,
    transform: 'rotate(' + Math.atan2(y2 - y1, x2 - x1) + 'rad)',
    position: 'absolute'
  }
   
  return <svg className="arrow" style={svgStyle}>
    <line className="arrowLine" x1="0" x2={length-arrowDx} y1={arrowDy} y2={arrowDy}/>
    <polygon className="arrowHead" points={arrowPoints} />
  </svg>
}

export default Arrow
