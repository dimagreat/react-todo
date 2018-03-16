// @flow
import React from 'react';

import { type TodoEntity } from './TodoList';

export class Todo extends React.PureComponent<TodoEntity> {
  render() {
    return <p>{this.props.name}</p>;
  }
}
