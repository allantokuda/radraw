import React from 'react'
import { connect } from 'react-redux'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ChartNode from './ChartNode'
import Arrow from './Arrow'
import { arrowId } from './reducers/arrows'

let PrecedenceChart = ({ state, dispatch }) => {
  let handleChartClick = (event, a, b) => {
    let x = (event.clientX - event.target.getBoundingClientRect()['x'] - state.editor.panX) / state.editor.scale
    let y = (event.clientY - event.target.getBoundingClientRect()['y'] - state.editor.panY) / state.editor.scale
    if (state.editor.action === 'new_relation') {
      dispatch({ type: 'CREATE_RELATION', x, y: y - 55 })
    } else {
      dispatch({ type: 'DESELECT_ALL' })
    }
  }

  let handlePan = (e) => {
    dispatch({ type: 'PAN', x: e.positionX, y: e.positionY })
  }
  let handleZoom = (e) => {
    dispatch({ type: 'ZOOM', scale: e.scale, x: e.positionX, y: e.positionY  })
  }

  const disabled = !!state.nodes.find(node => node.selected)

  return (
    <div className="precedenceChart" onClick={handleChartClick}>
      <TransformWrapper
        options={{ limitToBounds: false, minScale: 0.2, disabled }}
        doubleClick={{disabled: true}}

        pan={{ velocity: false, disabled }}
        onPanning={handlePan}
        defaultPositionX={state.editor.panX}
        defaultPositionY={state.editor.panY}
        positionX={state.editor.panX}
        positionY={state.editor.panY}

        wheel={{step: 80}}
        onWheel={handleZoom}
        scale={state.editor.scale}
      >

        <TransformComponent>
          <div className="chartCanvas">
            {false && <pre id='statewatch'>{ JSON.stringify(state, null, 2) }</pre> }

            {state.nodes.map(node => {
              const relation = state.relations.find(relation => relation.id === node.resultRelationId)
              return <ChartNode key={node.id} node={node} relation={relation} />
            })}
            {state.arrows.map(arrow => (
              <Arrow {...arrow}
                key={arrowId(arrow)}/>
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

PrecedenceChart = connect(state => ({state}))(PrecedenceChart);

export default PrecedenceChart
