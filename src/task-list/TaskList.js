// @flow
import React from 'react';

import { Task } from '../task/Task';
import { TaskCreator } from '../task-creator/TaskCreator';

type TaskType = {
  name: string,
};

type Props = {};

type State = {
  tasks: TaskType[],
};

export class TaskList extends React.Component<Props, State> {
  state: State = {
    tasks: [{ name: 'Eat this' }, { name: 'Eat that' }],
  };

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
