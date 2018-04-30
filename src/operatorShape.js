const operatorShape = ({ shape, width, height }) => {
  // Something default to render to avoid error
  width = width || 100
  height = height || 70

  let w = width / 2
  let h1 = width * 0.1
  let h2 = width * 0.2
  let points

  let boxBottom = [
    { x:  w, y: height },
    { x: -w, y: height }
  ]

  switch(shape) {
    case 'HalfHouseLeft':
      points = [
        { x: -w, y:  0, connection: true },
        { x:  w, y: h2, connection: true },
      ].concat(boxBottom)
      break

    case 'HalfHouseRight':
      points = [
        { x: -w, y: h2, connection: true },
        { x:  w, y:  0, connection: true },
      ].concat(boxBottom)
      break

    case 'FullHouse':
      points = [
        { x: -w, y: h2, connection: true },
        { x:  0, y: h1 },
        { x:  w, y: h2, connection: true },
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
