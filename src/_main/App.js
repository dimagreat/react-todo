// @flow
import React from 'react';
import './App.css';
import { TaskList } from '../task-list/TaskList';

const tasks = [{ name: 'Eat this' }, { name: 'Eat that' }];

class App extends React.Component<{}> {
  render() {
    return (
      <div className="App">
        <TaskList tasks={tasks} />
      </div>
    );
  }
}

export default App;
