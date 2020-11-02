import React from 'react'
import classNames from 'classnames'

let ActionButton = (labelText, onClick, icon, classNames) => (
  <button onClick={newRelation} className={classNames({ operatorButton: true, selected: state.editor.action === 'new_relation' })}>
    <div className="buttonContents">
      <div className="relation" style={{ boxSizing: 'border-box', height: '25px', width: '50px', marginTop: '10px' }}>
        &#10133;
      </div>
      <label className="">New Relation</label>
    </div>
  </button>
)
