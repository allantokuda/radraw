import React from 'react'

export const OPERATOR_SHAPES = {
  PILL: 'Pill',
  HEXAGON: 'Hexagon',
  FULL_HOUSE: 'FullHouse',
  HALF_HOUSE_LEFT: 'HalfHouseLeft',
  HALF_HOUSE_RIGHT: 'HalfHouseRight',
  TRIANGLE: 'Triangle',
}

const operatorShape = ({ shape, width, height }) => {
  // Something default to render to avoid error
  width = width || 100
  height = height || 70

  let w = width / 2
  // let h1 = width * 0.1
  let h2 = width * 0.2
  let points

  let boxBottom = [
    { x:  w, y: height },
    { x: -w, y: height }
  ]

  switch(shape) {
    //case OPERATOR_SHAPES.PILL:
    //  let w1 = Math.max(w - height * 0.4, w * 0.6)
    //  points = [
    //    { x: -w1, y: 0, connection: true },
    //    { x:  w1, y: 0, connection: true },
    //    { x:  w,  y: height / 2 },
    //    { x:  w1, y: height },
    //    { x: -w1, y: height },
    //    { x: -w,  y: height / 2 }
    //  ]
    //  break

    case OPERATOR_SHAPES.HEXAGON:
      let w1 = Math.max(w - height * 0.4, w * 0.6)
      points = [
        { x: -w1, y: 0 },
        { x:  0,  y: 0, connection: true },
        { x:  w1, y: 0 },
        { x:  w,  y: height / 2 },
        { x:  w1, y: height },
        { x: -w1, y: height },
        { x: -w,  y: height / 2 }
      ]
      break

    case OPERATOR_SHAPES.HALF_HOUSE_LEFT:
      points = [
        { x: -w, y:  0, connection: true },
        { x:  w, y: h2, connection: true },
      ].concat(boxBottom)
      break

    case OPERATOR_SHAPES.HALF_HOUSE_RIGHT:
      points = [
        { x: -w, y: h2, connection: true },
        { x:  w, y:  0, connection: true },
      ].concat(boxBottom)
      break

    case OPERATOR_SHAPES.FULL_HOUSE:
      points = [
        { x: -w, y: h2, connection: true },
        { x:  0, y: 0 },
        { x:  w, y: h2, connection: true },
      ].concat(boxBottom)
      break

    case OPERATOR_SHAPES.TRIANGLE:
      points = [
        { x:  0, y: 0, connection: true },
        { x:  w, y: height },
        { x: -w, y: height, connection: true },
      ].concat(boxBottom)
      break

    default:
      points = [
        { x: -w, y: 0, connection: true },
        { x:  w, y: 0, connection: true },
      ].concat(boxBottom)
  }

  return points
}

export const connectionPoints = (operator) => {
  let points = operatorShape(operator)
  return points.filter(point => point.connection)
}

export const polygonPoints = (operator) => {
  let points = operatorShape(operator)
  return points.map(point => [point.x, point.y])
}

const shapeInSvg = (operator) => {
  if (operator.shape === undefined) {
    return <circle cx="0" cy="50%" r="20" />
  } else if (operator.shape) {
    return <polygon points={polygonPoints({...operator})}/>
  }
}

export const svgShape = (operator) => {
  const width = operator.width || 100
  return <svg className="operatorShape" {...operator}>
    <g transform={"translate(" + (width / 2) + ",0)"}>
      {shapeInSvg(operator)}
    </g>
  </svg>
}
