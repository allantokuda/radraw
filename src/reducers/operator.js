export default (operator, action) => {
  switch (action.type) {
    case 'UPDATE_OPERATOR_PARAMS':
      let shape = operator.shape
      let type = operator.type
      let style = {}

      if (operator.type.match(/Match Join/)) {
        let orientation = shape.match('Left') ? 'Left' : 'Right'

        const search = action.value.toLowerCase().replace(' ', '')
        const aid = (search.match(/aid\((.)\)/) || [])[1] || ''
        const bid = (search.match(/bid\((.)\)/) || [])[1] || ''

        if (aid === 'n' || bid === 'n' || aid.match(/[em]/) && bid.match(/[sod]/)) {
          type = 'Bad Match Join'
          style = { stroke: 'red', fill: '#fee' }
        } else {
          type = 'Match Join'
        }

        if (aid.match(/[sod]/) && bid.match(/[sod]/)) {
          shape = 'FullHouse' + orientation

        } else if (aid === bid && aid.match(/[em]/) && bid.match(/[em]/)) {
          shape = 'HalfHouse' + orientation + 'Symmetric'

        } else if (aid !== bid && aid.match(/[em]/) && bid.match(/[em]/)) {
          shape = 'HalfHouse' + orientation
          style = { strokeDasharray: '5 5' }

        } else if (bid.match(/[em]/)) {
          shape = 'HalfHouse' + orientation
        }
      }

      return Object.assign({}, operator, { params: action.value, shape, type, style })

    default:
      return operator;
  }
}

