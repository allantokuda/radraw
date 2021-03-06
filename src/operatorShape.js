import React from 'react'

export const OPERATOR_SHAPES = {
  PILL: 'Pill',
  HEXAGON: 'Hexagon',
  FULL_HOUSE_LEFT: 'FullHouseLeft',
  FULL_HOUSE_RIGHT: 'FullHouseRight',
  HALF_HOUSE_LEFT: 'HalfHouseLeft',
  HALF_HOUSE_LEFT_SYMMETRIC: 'HalfHouseLeftSymmetric',
  HALF_HOUSE_RIGHT: 'HalfHouseRight',
  HALF_HOUSE_RIGHT_SYMMETRIC: 'HalfHouseRightSymmetric',
  TRIANGLE_LEFT: 'TriangleLeft',
  TRIANGLE_RIGHT: 'TriangleRight',
}

export const flip = (shape) => {
  switch (shape) {
    case OPERATOR_SHAPES.HALF_HOUSE_LEFT: return OPERATOR_SHAPES.HALF_HOUSE_RIGHT
    case OPERATOR_SHAPES.HALF_HOUSE_RIGHT: return OPERATOR_SHAPES.HALF_HOUSE_LEFT
    case OPERATOR_SHAPES.HALF_HOUSE_LEFT_SYMMETRIC: return OPERATOR_SHAPES.HALF_HOUSE_RIGHT_SYMMETRIC
    case OPERATOR_SHAPES.HALF_HOUSE_RIGHT_SYMMETRIC: return OPERATOR_SHAPES.HALF_HOUSE_LEFT_SYMMETRIC
    case OPERATOR_SHAPES.TRIANGLE_LEFT: return OPERATOR_SHAPES.TRIANGLE_RIGHT
    case OPERATOR_SHAPES.TRIANGLE_RIGHT: return OPERATOR_SHAPES.TRIANGLE_LEFT
    default: return null
  }
}

const operatorKeypoints = ({ shape, width, height }) => {
  // 100x100 default size to avoid rendering error if unspecified.
  // Subtract 2 pixels to give room for SVG borders, which expand both inward and outward from the true edge.
  width = width - 2 || 100
  height = height - 2 || 70

  let w = width / 2
  let w1 = Math.max(w - 30, w * 0.6)
  // let h1 = width * 0.1
  let h2 = width * 0.2 // for drawing house shapes
  let points

  const boxBottom = [
    { x:  w, y: height },
    { x: -w, y: height }
  ]

  const boxBottomReverse = [boxBottom[1], boxBottom[0]]

  switch(shape) {
    case OPERATOR_SHAPES.PILL:
      points = [
        { x: 0, y: 0, connection: true }
      ]
      break

    case OPERATOR_SHAPES.HEXAGON:
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

    case OPERATOR_SHAPES.HALF_HOUSE_LEFT_SYMMETRIC:
      points = [
        { x: -w, y:  0, connection: true },
        { x: -w, y:  0, connection: true },
        { x:  w, y: h2 },
      ].concat(boxBottom)
      break

    case OPERATOR_SHAPES.HALF_HOUSE_RIGHT:
      points = [
        { x:  w, y:  0, connection: true },
        { x: -w, y: h2, connection: true },
      ].concat(boxBottomReverse)
      break

    case OPERATOR_SHAPES.HALF_HOUSE_RIGHT_SYMMETRIC:
      points = [
        { x:  w, y:  0, connection: true },
        { x:  w, y:  0, connection: true },
        { x: -w, y: h2 },
      ].concat(boxBottomReverse)
      break

    case OPERATOR_SHAPES.FULL_HOUSE_LEFT:
      points = [
        { x: -w, y: h2, connection: true },
        { x:  0, y: 0 },
        { x:  w, y: h2, connection: true },
      ].concat(boxBottom)
      break

    case OPERATOR_SHAPES.FULL_HOUSE_RIGHT:
      points = [
        { x:  w, y: h2, connection: true },
        { x:  0, y: 0 },
        { x: -w, y: h2, connection: true },
      ].concat(boxBottomReverse)
      break

    case OPERATOR_SHAPES.TRIANGLE_LEFT:
      points = [
        { x:  0, y: 0, connection: true },
        { x:  w, y: height, connection: true },
        { x: -w, y: height },
      ].concat(boxBottom)
      break

    case OPERATOR_SHAPES.TRIANGLE_RIGHT:
      points = [
        { x:  0, y: 0, connection: true },
        { x: -w, y: height, connection: true },
        { x:  w, y: height },
      ].concat(boxBottomReverse)
      break

    default:
      points = [
        { x: -w, y: 0 },
        { x:  w, y: 0 },
      ].concat(boxBottom)
  }

  return points
}

export const connectionPoints = (operator) => {
  let points = operatorKeypoints(operator)
  return points.filter(point => point.connection).map((point, i) => Object.assign({}, point, { connection: i }))
}

export const polygonPoints = (operator) => {
  let points = operatorKeypoints(operator)
  return points.map(point => [point.x, point.y])
}

export const pillParameters = (operator) => {
  const h = operator.height
  const w = Math.max(operator.width, operator.height) // disallow being taller than width
  const r = h/2 - 2
  const x1 = w/2 - h/2 - 1
  return [
    'M', -x1, 1,
    'L', x1, 1,
    'A', r, r, 0, 0, 1, x1, h-1,
    'L', -x1, h-1,
    'A', r, r, 0, 0, 1, -x1, 1
  ].join(' ')
}

const shapeInSvg = (operator) => {
  if (operator.shape === OPERATOR_SHAPES.PILL) {
    return (
      <path d={pillParameters({...operator})}/>
    )
  } else if (operator.shape) {
    return <polygon points={polygonPoints({...operator})}/>
  }
}

export const svgShape = (operator) => {
  const width = operator.width || 100
  return <svg className="operatorSvg" {...operator}>
    <g transform={"translate(" + (width / 2) + ",0)"}>
      {shapeInSvg(operator)}
    </g>
  </svg>
}

export const titleY = (operator) => {
  if (!operator.shape) {
    return 0
  } else if (operator.shape.match('House')) {
    return (operator.width || 100) * 0.1 + 20
  } else if (operator.shape.match('Triangle')) {
    return (operator.width || 100) * 0.3 + 20
  } else if (operator.params === undefined) {
    return 20
  } else {
    return 10
  }
}
