const emptySheet = [[{ value: null }]]

// immutable splicing

const arrayInsert = (array, i, newVal) => {
  return [
    ...array.slice(0, i), newVal, ...array.slice(i)
  ]
}

const arrayDelete = (array, i) => {
  return [
    ...array.slice(0, i), ...array.slice(i+1)
  ]
}

export default (sheet = emptySheet, action = {}) => {
  switch (action.type) {
    case 'COLUMN_INSERT_LEFT':
      return sheet.map(row => arrayInsert(row, action.columnId, { value: null }))

    case 'COLUMN_INSERT_RIGHT':
      return sheet.map(row => arrayInsert(row, action.columnId + 1, { value: null }))

    case 'COLUMN_DELETE':
      return sheet.map(row => arrayDelete(row, action.columnId))

    case 'EDIT_DATA':
      let newSheet = sheet.map(row => [...row])
      action.changes.forEach(({ cell, row, col, value }) => {
        newSheet[row][col] = { ...newSheet[row][col], value };
      });
      return newSheet

    default:
      return sheet
  }
}
