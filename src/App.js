import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      text: 'example'
    }
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          radraw
        </header>
        <Draggable handle=".handle">
          <div className="operator">
            <input name="name" value={this.state.text} onChange={this.handleChange.bind(this)}/>
            <svg className="handle" height="100" width="100">
              <polygon points="0,0, 100,20 100,100 0,100" />
            </svg>
          </div>
        </Draggable>
      </div>
    );
  }
}

export default App;
