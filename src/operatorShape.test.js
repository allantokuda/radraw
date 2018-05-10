import React from 'react'
import { OPERATOR_SHAPES, svgShape } from './operatorShape'

describe('operator shape', () => {
  it('returns an empty SVG if no operator supplied', () => {
    expect(svgShape()).toEqual(<svg>{null}</svg>)
  })

  it('returns a svg rectangle for an operator with a that specifies no shape', () => {
    let operator = {}
    let result = svgShape(operator)
    expect(result.type).toEqual('svg')
    expect(result.props.children.type).toEqual('rectangle')
  })

  it('returns a svg polygon for a half-house operator', () => {
    let operator = { type: OPERATOR_SHAPES.HALF_HOUSE_RIGHT }
    let result = svgShape(operator)
    expect(result.type).toEqual('svg')
    expect(result.props.children.type).toEqual('polygon')
  })

  it('includes the width and height of the operator on the svg', () => {
    let operator = { width: 70, height: 60 }
    let result = svgShape(operator)
    expect(result.props.width).toEqual(70)
    expect(result.props.height).toEqual(60)
  })
})
