export default (operator, action) => {
  switch (action.type) {
    case 'UPDATE_OPERATOR_PARAMS':
      let shape = operator.shape
      let type = operator.type
      let style = {}

      if (operator.type.match(/Match Join/)) {
        let orientation = shape.match('Left') ? 'Left' : 'Right'

        const search = action.value.toLowerCase().replace(/ /g, '')
        const aid = (search.match(/aid\(([a-z]+)\)/) || [])[1] || ''
        const bid = (search.match(/bid\(([a-z]+)\)/) || [])[1] || ''

        const blank = (aid.length === 0 || bid.length === 0)
        const tooLong = (aid.length > 1 || bid.length > 1)
        const badChars = !aid.match(/[demos]/) || !bid.match(/[demos]/)
        const degenerate = aid.match(/[em]/) && bid.match(/[sod]/) // This prevents the base of entity A from being passed through; need to flip

        if (!blank && (tooLong || badChars || degenerate)) {
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

        } else {
          shape = 'HalfHouse' + orientation
        }
      }

      return Object.assign({}, operator, { params: action.value, shape, type, style })

    default:
      return operator;
  }
}

