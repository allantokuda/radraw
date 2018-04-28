import React from 'react'

const Arrow = ({ x1, y1, x2, y2 }) => {

  const length = Math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
  const headLength = 10
  const headWidth = 8

  // Draw arrow pointing downward as baseline because this app typically draws downward arrows
  const arrowPoints = [
    [-headWidth / 2, length - headLength], // left edge of arrow head's base
    [             0, length             ], // tip of arrow head
    [ headWidth / 2, length - headLength]  // right edge of arrow head's base
  ].map(point => point.join(',')).join(' ')

  const svgPosition = {
    width: headWidth,
    height: length,
    left: (x2 + x1) / 2 - headWidth,
    top: (y2 + y1) / 2 - length / 2,
    transform: 'rotate(' + Math.atan2(x2 - x1, y2 - y1) + 'rad)'
  }
   
  return <svg className="arrow" style={svgPosition}>
    <g transform={"translate(" + headWidth / 2 + ", 0)"}>
      <line className="arrowLine" x1="0" x2="0" y1="0" y2={length-headLength}/>
      <polygon className="arrowHead" points={arrowPoints} />
    </g>
  </svg>
}

export default Arrow
