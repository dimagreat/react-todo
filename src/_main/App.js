// @flow
import React from 'react';
import './App.css';
import { TaskList } from '../task-list/TaskList';
import { firebaseInit } from '../firebase';

class App extends React.Component<{}> {
  componentWillMount() {
    firebaseInit();
  }

  render() {
    return (
      <div className="App">
        <TaskList />
      </div>
    );
  }
}

export default App;
