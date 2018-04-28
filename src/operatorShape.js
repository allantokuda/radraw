export default ({ shape, width, height }) => {
  let h1 = width * 0.1
  let h2 = width * 0.2
  let points

  switch(shape) {
    case 'HalfHouseLeft':
      points = [[0, 0], [width, h2], [width, height], [0, height]]
      break

    case 'HalfHouseRight':
      points = [[0, h2], [width, 0], [width, height], [0, height]]
      break

    case 'FullHouse':
      points = [[0, h2], [width/2, h1], [width, h2], [width, height], [0, height]]
      break

    default:
      points = [[0, 0], [width, 0], [width, height], [0, height]]
  }

  return points
}
