export default (shape, width) => {
  let w = 100;
  let h = 70;
  let s = w * 0.2;

  let halfHouse = [[0,0], [w, s], [w, h], [0, h]]

  return halfHouse;
}
