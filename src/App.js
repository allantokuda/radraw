import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          radraw
        </header>
        <Draggable>
          <div className="operator">Filter</div>
        </Draggable>
      </div>
    );
  }
}

export default App;
