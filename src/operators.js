export const UNARY_OPERATOR = 'Unary'
export const BINARY_OPERATOR = 'Binary'

export const PROJECT     = 'Project'
export const FILTER      = 'Filter'
export const REDUCE      = 'Reduce'
export const GROUP       = 'Group'
export const TIMES       = 'Times'
export const UNION       = 'Union'
export const INTERSECT   = 'Intersect'
export const MINUS       = 'Minus'
export const INNER_JOIN  = 'Inner Join'
export const OUTER_JOIN  = 'Outer Join'
export const FULL_MINUS  = 'Full Minus'
export const DIVIDE      = 'Divide'
export const FULL_DIVIDE = 'Full Divide'


export default [
  { category: UNARY_OPERATOR,  type: PROJECT     },
  { category: UNARY_OPERATOR,  type: FILTER      },
  { category: UNARY_OPERATOR,  type: REDUCE      },
  { category: UNARY_OPERATOR,  type: GROUP       },
  { category: BINARY_OPERATOR, type: TIMES       },
  { category: BINARY_OPERATOR, type: UNION       },
  { category: BINARY_OPERATOR, type: INTERSECT   },
  { category: BINARY_OPERATOR, type: MINUS       },
  { category: BINARY_OPERATOR, type: INNER_JOIN  },
  { category: BINARY_OPERATOR, type: OUTER_JOIN  },
  { category: BINARY_OPERATOR, type: FULL_MINUS  },
  { category: BINARY_OPERATOR, type: DIVIDE      },
  { category: BINARY_OPERATOR, type: FULL_DIVIDE },
]
