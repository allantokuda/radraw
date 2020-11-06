export default (operator, action) => {
  switch (action.type) {
    case 'UPDATE_OPERATOR_PARAMS':
      let shape = operator.shape
      let type = operator.type

      const search = action.value.toLowerCase().replace(' ', '')

      if (operator.type.match(/Match Join/)) {
        let orientation = shape.match('Left') ? 'Left' : 'Right'

        if (search.match(/aid\([em]\)/) && search.match(/bid\([sod]\)/)) {
          type = 'Bad Match Join'
        } else {
          type = 'Match Join'
        }

        if (search.match(/aid\([sod]\)/) && search.match(/bid\([sod]\)/)) {
          shape = 'FullHouse' + orientation
        } else if (search.match(/bid\([em]\)/)) {
          shape = 'HalfHouse' + orientation
        }
      }

      return Object.assign({}, operator, { params: action.value, shape, type })
      break

    default:
      return operator;
  }
}

