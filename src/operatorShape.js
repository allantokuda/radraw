export default (shape, width, height) => {
  let h2 = width * 0.2;

  let halfHouse = [[0,0], [width, h2], [width, height], [0, height]]

  return halfHouse;
}
