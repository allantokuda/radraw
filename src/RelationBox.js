import React from 'react'
import ContentEditable from 'react-contenteditable'
import * as actions from './actions'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'

export default ({ node, relation, state, onChange }) => {
  const dispatch = useDispatch()
  const selected = node.selected

  const selectRelation = (toggleMode) => {
    if (state.editor.action === 'connect') {
      dispatch(actions.finishConnect(node.id))
    } else {
      dispatch(actions.select(node.id, toggleMode))
    }
  }

  const handleClick = (event) => {
    event.stopPropagation()
    selectRelation(event.shiftKey)
  }

  const handleRelationTouchStart = (event) => {
    selectRelation(event.touches.length > 1)
  }

  const handleEditName = (event) => {
    dispatch(actions.renameRelation(node.resultRelationId, event.target.value))
    setTimeout(onChange)
  }

  return (
    <div className="relation dragHandle centeredOnZeroWidthParent"
      onClick={handleClick}
      onTouchStart={handleRelationTouchStart}
      onTouchEnd={e => e.preventDefault()} /* prevent click + touch events from both firing */
    >
      <ContentEditable className={classNames({ noDrag: selected, relationEdit: true })}
                       html={relation.name}
                       disabled={!selected}
                       onChange={handleEditName}/>
    </div>
  )
}
