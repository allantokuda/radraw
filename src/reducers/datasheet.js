const emptySheet = [[{ value: '' }]]

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
      return sheet.map(row => arrayInsert(row, action.columnId, { value: '' }))

    case 'COLUMN_INSERT_RIGHT':
      return sheet.map(row => arrayInsert(row, action.columnId + 1, { value: '' }))

    case 'COLUMN_DELETE':
      return sheet.map(row => arrayDelete(row, action.columnId))

    case 'EDIT_DATA':
      let newSheet = sheet.map(row => [...row])
      let isClear = action.changes.map(change => change.value).join('').length === 0
      let sheetWidth = sheet[0].length
      let changeColumns = action.changes.map(change => change.col)
      let isFullRow = (Math.max(...changeColumns) - Math.min(...changeColumns) === sheetWidth - 1)

      // insert changes
      let effectCount = 0
      action.changes.forEach(({ cell, row, col, value }) => {
        if (newSheet[row][col].value !== value) { effectCount++ }
        newSheet[row][col] = { ...newSheet[row][col], value };
      });

      // delete rows if requesting to clear full rows that are already empty
      if (isFullRow && isClear && effectCount === 0) {
        let rows = action.changes.map(change => change.row)
        let firstRow = Math.min(...rows)
        let lastRow = Math.max(...rows)
        newSheet.splice(firstRow, lastRow-firstRow+1)
      }

      // ensure we always have at least one cell
      if (newSheet.length === 0) newSheet = emptySheet

      // ensure there is always an empty row at the bottom
      let lastRow = newSheet[newSheet.length-1]
      if (lastRow.map(cell => cell.value).join('').length > 0) {
        newSheet.push(lastRow.map(cell => ({ value: '' })))
      }

      return newSheet

    default:
      return sheet
  }
}
