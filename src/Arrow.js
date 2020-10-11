import React from 'react'
import { useDispatch } from 'react-redux'
import { select } from './actions'
import { arrowId } from './reducers/arrows'

const Arrow = (arrow) => {
  const { x1, y1, x2, y2, selected } = arrow
  const length = Math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
  const headLength = 10
  const headWidth = 8
  const dispatch = useDispatch()

  // Draw arrow pointing downward as baseline because this app typically draws downward arrows
  const arrowPoints = [
    [-headWidth / 2, length - headLength], // left edge of arrow head's base
    [             0, length             ], // tip of arrow head
    [ headWidth / 2, length - headLength]  // right edge of arrow head's base
  ].map(point => point.join(',')).join(' ')

  const svgPosition = {
    width: headWidth*3,
    height: length,
    left: (x2 + x1) / 2 - headWidth * 1.5,
    top: (y2 + y1) / 2 - length / 2,
    transform: 'rotate(' + Math.atan2(x1 - x2, y2 - y1) + 'rad)'
  }

  const handleClick = (event) => {
    dispatch(select(arrowId(arrow), event.shiftKey))
  }
   
  return <svg className={"arrow " + (selected ? 'selected' : '')} style={svgPosition}>
    <g transform={"translate(" + headWidth * 1.5 + ", 0)"}>
      <line className="arrowLine" x1="0" x2="0" y1="0" y2={length-headLength} />
      <line className="arrowClickArea" x1="0" x2="0" y1="0" y2={length-headLength-20} onClick={handleClick}/>
      <polygon className="arrowHead" points={arrowPoints} />
    </g>
  </svg>
}

export default Arrow
