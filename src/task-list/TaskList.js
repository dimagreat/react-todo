// @flow
import React from 'react';

import { Task } from '../task/Task';
import { TaskCreator } from '../task-creator/TaskCreator';
import { getTodoDB } from '../firebase';

export type TaskEntity = {
  name: string,
};

type Props = {};

type State = {
  tasks: TaskEntity[],
};

export class TaskList extends React.Component<Props, State> {
  state: State = {
    tasks: [],
  };

  componentDidMount() {
    getTodoDB().then((tasks: TaskEntity[]) => {
      this.setState({ tasks: tasks.val().todos });
    });
  }

  render() {
    const { tasks } = this.state;
    return (
      <div>
        <TaskCreator createTask={this.createTask} />
        <div>{tasks.map((task, index) => <Task {...task} key={index} />)}</div>
      </div>
    );
  }

  createTask = (name: string) => {
    const task = { name };
    this.setState({ tasks: [...this.state.tasks, task] });
  };
}
