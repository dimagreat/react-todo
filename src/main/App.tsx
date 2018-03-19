import * as React from 'react';

import { TodoList } from '../todo-list/TodoList';
import './App.css';

export class App extends React.Component<{}> {
  public render() {
    return (
      <div className="App">
        <h1>ToDo List!</h1>
        <TodoList />
      </div>
    );
  }
}
