import reducer from './datasheet'

describe('datasheet reducer', () => {
  it('adds a column after the current column', () => {
    expect(reducer(
      [[1,2],[3,4]],
      { type: 'COLUMN_INSERT_RIGHT', relationId: 0, columnId: 1 }
    )).toEqual(
      [[1,2,{ value: null }],[3,4, { value: null }]]
    )

  })

  it('adds a column before the current column', () => {
    expect(reducer(
      [[1,2],[3,4]],
      { type: 'COLUMN_INSERT_LEFT', relationId: 0, columnId: 0 }
    )).toEqual(
      [[{ value: null }, 1,2],[{ value: null }, 3,4]]
    )
  })

  it('deletes a column', () => {
    expect(reducer(
      [[1,2,3],[2,4,6]],
      { type: 'COLUMN_DELETE', relationId: 0, columnId: 1 }
    )).toEqual(
      [[1,3],[2,6]]
    )
  })
})
