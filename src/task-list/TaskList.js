import React from 'react';

import { Task } from '../task/Task';

export function TaskList(props) {
  return <div>{props.tasks.map((task, index) => <Task {...task} key={index} />)}</div>;
}
