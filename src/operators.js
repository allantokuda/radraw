import { OPERATOR_SHAPES } from './operatorShape'

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

const operators = [
  { category: UNARY_OPERATOR,  type: PROJECT,     shape: OPERATOR_SHAPES.PILL },
  { category: UNARY_OPERATOR,  type: FILTER,      shape: OPERATOR_SHAPES.PILL },
  { category: UNARY_OPERATOR,  type: REDUCE,      shape: OPERATOR_SHAPES.HEXAGON },
  { category: UNARY_OPERATOR,  type: GROUP,       shape: OPERATOR_SHAPES.HEXAGON },
  { category: BINARY_OPERATOR, type: TIMES,       shape: OPERATOR_SHAPES.FULL_HOUSE },
  { category: BINARY_OPERATOR, type: UNION,       shape: OPERATOR_SHAPES.HALF_HOUSE_LEFT },
  { category: BINARY_OPERATOR, type: INTERSECT,   shape: OPERATOR_SHAPES.HALF_HOUSE_LEFT },
  { category: BINARY_OPERATOR, type: MINUS,       shape: OPERATOR_SHAPES.HALF_HOUSE_LEFT },
  { category: BINARY_OPERATOR, type: INNER_JOIN,  shape: OPERATOR_SHAPES.HALF_HOUSE_LEFT },
  { category: BINARY_OPERATOR, type: OUTER_JOIN,  shape: OPERATOR_SHAPES.HALF_HOUSE_LEFT },
  { category: BINARY_OPERATOR, type: FULL_MINUS,  shape: OPERATOR_SHAPES.HALF_HOUSE_LEFT },
  { category: BINARY_OPERATOR, type: DIVIDE,      shape: OPERATOR_SHAPES.TRIANGLE },
  { category: BINARY_OPERATOR, type: FULL_DIVIDE, shape: OPERATOR_SHAPES.TRIANGLE },
]

export default operators

export function operatorData(operatorType) {
  operators.find(operator => operator.type === operatorType)
}

export function numOperatorInputs(operatorType) {
  let op = operators.find(operator => operator.type === operatorType)
  return op.category === UNARY_OPERATOR ? 1 : 2
}

export function operatorShape(operatorType) {
  let op = operators.find(operator => operator.type === operatorType)
  return op.shape
}

