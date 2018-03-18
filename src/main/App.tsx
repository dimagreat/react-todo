import * as React from 'react';
import './App.css';
import { TodoList } from '../todo-list/TodoList';

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
