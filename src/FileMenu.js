import React from 'react'
import classNames from 'classnames'
import { connect, useDispatch } from 'react-redux'
import { Menu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

const menuButton = (
  <button className={classNames({ operatorButton: true })} style={{position: 'relative'}}>
    <div className="buttonContents">
      <span style={{fontSize: 30, padding: '0 10px' }}>&#128462;</span>
      <label className="">File</label>
    </div>
  </button>
)

let FileMenu = ({ state }) => {
  const dispatch = useDispatch()

  const newChart = () => {
    dispatch({ type: 'NEW_CHART' })
    dispatch({ type: 'PAN', x: 0, y: 0 })
  }

  const openChart = () => {
    dispatch({ type: 'BROWSE' })
  }

  return (
    <Menu menuButton={menuButton}>
      <MenuItem onClick={newChart}>New Chart</MenuItem>
      <MenuItem onClick={openChart}>Open Chart</MenuItem>
    </Menu>
  )
}


export default connect(state => ({state}))(FileMenu);
