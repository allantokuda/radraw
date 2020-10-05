import { OPERATOR_SHAPES } from './operatorShape'

export const PROJECT     = 'Project'
export const FILTER      = 'Filter'
export const REDUCE      = 'Reduce'
export const GROUP       = 'Group'
export const TIMES       = 'Times'
export const UNION       = 'Union'
export const INTERSECT   = 'Intersect'
export const MINUS       = 'Minus'
export const MATCH_JOIN  = 'Match Join'
export const OUTER_JOIN  = 'Outer Join'
export const FULL_MINUS  = 'Full Minus'
export const DIVIDE      = 'Divide'
export const FULL_DIVIDE = 'Full Divide'

const operators = [
  { numInputs: 1, type: PROJECT,     shape: OPERATOR_SHAPES.PILL, defaultParams: '' },
  { numInputs: 1, type: FILTER,      shape: OPERATOR_SHAPES.PILL, defaultParams: '' },
  { numInputs: 1, type: REDUCE,      shape: OPERATOR_SHAPES.HEXAGON, defaultParams: 'id: ' },
  { numInputs: 1, type: GROUP,       shape: OPERATOR_SHAPES.HEXAGON, defaultParams: 'over: ' },

  { numInputs: 2, type: TIMES,       shape: OPERATOR_SHAPES.FULL_HOUSE },
  { numInputs: 2, type: UNION,       shape: OPERATOR_SHAPES.HALF_HOUSE_LEFT_SYMMETRIC },
  { numInputs: 2, type: INTERSECT,   shape: OPERATOR_SHAPES.HALF_HOUSE_LEFT_SYMMETRIC },
  { numInputs: 2, type: MINUS,       shape: OPERATOR_SHAPES.HALF_HOUSE_LEFT },
  { numInputs: 2, type: MATCH_JOIN,  shape: OPERATOR_SHAPES.HALF_HOUSE_LEFT, defaultParams: 'Aid(): \nBid(): ' },
  { numInputs: 2, type: OUTER_JOIN,  shape: OPERATOR_SHAPES.HALF_HOUSE_LEFT, defaultParams: 'Aid(): \nBid(): ' },
  { numInputs: 2, type: FULL_MINUS,  shape: OPERATOR_SHAPES.HALF_HOUSE_LEFT, defaultParams: 'Aid(): \nBid(): ' },
  { numInputs: 2, type: DIVIDE,      shape: OPERATOR_SHAPES.TRIANGLE },
  { numInputs: 2, type: FULL_DIVIDE, shape: OPERATOR_SHAPES.TRIANGLE, defaultParams: 'Aid(): \nBid(): \nResult id: ' },
]

export default operators

export function operatorTypeProperties(operatorType) {
  return operators.find(operator => operator.type === operatorType)
}

export function operatorHasParams(operatorType) {
  return operatorType && [TIMES, UNION, INTERSECT, MINUS, DIVIDE].indexOf(operatorType) === -1
}
