// @flow
import React from 'react';
import './App.css';
import { TodoList } from '../todo-list/TodoList';

class App extends React.Component<{}> {
  render() {
    return (
      <div className="App">
        <h1>ToDo List!</h1>
        <TodoList />
      </div>
    );
  }
}

export default App;
