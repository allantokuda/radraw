import React from 'react'
import { Menu, MenuItem } from '@szhsin/react-menu';
import { useDispatch } from 'react-redux'

export default ({ sheet, relationId, heading }) => {
  const columnId = heading.props.col
  const dispatch = useDispatch()
  const handleOption = (option) => { dispatch({ type: option, relationId, columnId }) }

  const menuButton = <button className="columnMenuButton" aria-label={"Options for column " + columnId}>...</button>

  return (
    <Menu menuButton={menuButton}>
      <MenuItem onClick={handleOption.bind(this, 'COLUMN_TOGGLE_PKEY')}>Include in key</MenuItem>
      <MenuItem onClick={handleOption.bind(this, 'COLUMN_INSERT_LEFT')}>Insert column left</MenuItem>
      <MenuItem onClick={handleOption.bind(this, 'COLUMN_INSERT_RIGHT')}>Insert column right</MenuItem>
      <MenuItem onClick={handleOption.bind(this, 'COLUMN_DELETE')}>Delete column</MenuItem>
    </Menu>
  )
}
