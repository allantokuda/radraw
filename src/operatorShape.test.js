import React from 'react'
import { OPERATOR_SHAPES, svgShape } from './operatorShape'

describe('operator shape', () => {
  const innerShape = (svg) => svg.props.children.props.children

  it('returns a circle when no type is specified', () => {
    let operator = { }
    let result = svgShape(operator)
    expect(result.type).toEqual('svg')
    expect(result.props.children.type).toEqual('g')
    expect(innerShape(result).type).toEqual('circle')
  })

  it('returns a svg polygon for a half-house operator', () => {
    let operator = { shape: OPERATOR_SHAPES.HALF_HOUSE_RIGHT }
    let result = svgShape(operator)
    expect(result.type).toEqual('svg')
    expect(result.props.children.type).toEqual('g')
    expect(innerShape(result).type).toEqual('polygon')
  })

  it('includes the width and height of the operator on the svg', () => {
    let operator = { width: 70, height: 60 }
    let result = svgShape(operator)
    expect(result.props.width).toEqual(70)
    expect(result.props.height).toEqual(60)
  })

  it('offsets a centered (half-width) coordinate system on the g', () => {
    let operator = { width: 70, height: 60 }
    let result = svgShape(operator)
    let g = svgShape(operator).props.children
    expect(g.props.transform).toEqual('translate(35,0)')
  })
})
