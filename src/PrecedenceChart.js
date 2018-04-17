import React, { Component } from 'react'
import { createStore } from 'redux'
import rootReducer from './reducers/index'
import DraggableNode from './DraggableNode'

const store = createStore(rootReducer)

class PrecedenceChart extends Component {
  render() {
    console.log(store.getState())
    return (
      <div>
        {store.getState().nodes.map(node => (<DraggableNode data={node} onChange={this.handleNodeChange} />))}
      </div>
    )
  }
}

export default PrecedenceChart
