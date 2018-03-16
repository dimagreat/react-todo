// @flow
import React from 'react';

import { type TodoEntity } from './TodoList';

export function Todo(props: TodoEntity) {
  return <p>{props.name}</p>;
}
