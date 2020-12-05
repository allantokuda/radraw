import reducer from './datasheet'

const stringSheet = (str) => str.split(';').map(row => row.split(',').map(val => ({ value: val })))

describe('datasheet reducer', () => {
  it('adds a column after the current column', () => {
    expect(reducer(
      [[1,2],[3,4]],
      { type: 'COLUMN_INSERT_RIGHT', relationId: 0, columnId: 1 }
    )).toEqual(
      [[1,2,{ value: '' }],[3,4, { value: '' }]]
    )
  })

  it('adds a column before the current column', () => {
    expect(reducer(
      [[1,2],[3,4]],
      { type: 'COLUMN_INSERT_LEFT', relationId: 0, columnId: 0 }
    )).toEqual(
      [[{ value: '' }, 1,2],[{ value: '' }, 3,4]]
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

  it('ensures there is always a blank row to enter data into', () => {
    expect(reducer(
      stringSheet('A,B,C'),
      { type: 'EDIT_DATA', relationId: 0, changes: [{ cell: {}, row: 0, col: 1, value: 'Boo' }] }
    )).toEqual(
      stringSheet('A,Boo,C;,,')
    )
  })


  it('clears data', () => {
    expect(reducer(
      stringSheet('A,B;C,D'),
      {
        type: 'EDIT_DATA',
        relationId: 0,
        changes: [
          { cell: {}, row: 0, col: 0, value: '' },
          { cell: {}, row: 0, col: 1, value: '' },
          { cell: {}, row: 1, col: 0, value: '' },
          { cell: {}, row: 1, col: 1, value: '' },
        ]
      }
    )).toEqual(
      stringSheet(',;,'),
    )
  })

  it('deletes rows when clearing already fully empty rows', () => {
    expect(reducer(
      stringSheet('A,B;,;E,F;,'),
      {
        type: 'EDIT_DATA',
        relationId: 0,
        changes: [
          { cell: {}, row: 1, col: 0, value: '' },
          { cell: {}, row: 1, col: 1, value: '' },
        ]
      }
    )).toEqual(
      stringSheet('A,B;E,F;,'),
    )
  })

  it('leaves one cell when clearing full sheet', () => {
    expect(reducer(
      stringSheet(',;,'),
      {
        type: 'EDIT_DATA',
        relationId: 0,
        changes: [
          { cell: {}, row: 0, col: 0, value: '' },
          { cell: {}, row: 0, col: 1, value: '' },
          { cell: {}, row: 1, col: 0, value: '' },
          { cell: {}, row: 1, col: 1, value: '' },
        ]
      }
    )).toEqual(
      stringSheet(''),
    )
  })
})
