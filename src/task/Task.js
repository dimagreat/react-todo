// @flow
import React from 'react';

import { type TaskEntity } from '../task-list/TaskList';

export function Task(props: TaskEntity) {
  return <p>{props.name}</p>;
}
