// @flow
import React from 'react';

import { Task } from '../task/Task';

type TaskType = {
  name: string,
};

type Props = {
  tasks: TaskType[],
};

export function TaskList(props: Props) {
  return <div>{props.tasks.map((task, index) => <Task {...task} key={index} />)}</div>;
}
