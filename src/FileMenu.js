import React from 'react'
import classNames from 'classnames'
import Select from 'react-select'
import { connect, useDispatch } from 'react-redux'

let FileMenu = ({ state }) => {
  const dispatch = useDispatch()

  const styles = {
    dropdownIndicator: () => ({ display: 'none' }),
    placeholder: () => ({ display: 'none' }),
    container: () => ({ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }),
    control: () => ({ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }),
    menu: (provided) => ({ ...provided, minWidth: 140 }),
    option: (provided) => ({ ...provided, color: 'black' })
  }

  const options = [
    { value: 'NEW_CHART', label: 'New Chart' },
  ]

  const menuPick = (option) => {
    if (option.value === 'NEW_CHART') {
      if(window.confirm('This will clear the chart. Continue?')) {
        dispatch({ type: option.value })
        dispatch({ type: 'PAN', x: 0, y: 0 })
      }
    }
  }

  return (
    <button className={classNames({ operatorButton: true })} style={{position: 'relative'}}>
      <Select options={options} styles={styles} value={null} onChange={menuPick}>
        <option>New Chart</option>
      </Select>
      <div className="buttonContents">
        <span style={{fontSize: 30, padding: '0 10px' }}>&#128462;</span>
        <label className="">File</label>
      </div>
    </button>
  )
}


export default connect(state => ({state}))(FileMenu);
