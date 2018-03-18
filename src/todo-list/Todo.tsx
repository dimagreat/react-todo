import * as React from 'react';

import { TodoEntity } from './constants';
import { updateTodoItem, removeTodoItem } from '../firebase/firebase-todo';

type Props = {
  todo: TodoEntity,
  onComplete: () => void,
};

export class Todo extends React.PureComponent<Props> {
  public render() {
    const style = {
      border: '1px solid #ccc',
      display: 'flex',
      flexDirection: 'column' as 'column',
      width: '300px',
      margin: '10px auto',
    };
    const { name, isCompleted } = this.props.todo;
    return (
      <div style={style}>
        <p>{name}</p>
        {isCompleted ? <p>completed</p> : <button onClick={this.completeTodo}>Complete</button>}
        <button onClick={this.removeTodo}>Remove</button>
      </div>
    );
  }

  private completeTodo = () => {
    const { todo, onComplete } = this.props;
    updateTodoItem(todo.id, {
      ...todo,
      isCompleted: true,
    }).then(onComplete);
  }

  private removeTodo = () => {
    const { todo: { id }, onComplete } = this.props;
    removeTodoItem(id).then(onComplete);
  }
}