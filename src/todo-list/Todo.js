// @flow
import React from 'react';

import { updateTodoItem } from '../firebase/firebase-todo';

type Props = {
  name: string,
  id: string,
  onComplete: () => void,
};

export class Todo extends React.PureComponent<Props> {
  render() {
    const style = {
      border: '1px solid #ccc',
      display: 'flex',
      flexDirection: 'column',
      width: '300px',
      margin: '10px auto',
    };
    return (
      <div style={style}>
        <p>{this.props.name}</p>
        <p>{this.props.isCompleted && 'completed'}</p>
        <button onClick={this.completeTodo}>Complete</button>
      </div>
    );
  }

  completeTodo = () => {
    updateTodoItem(this.props.id, {
      name: this.props.name,
      isCompleted: true,
    }).then(this.props.onComplete);
  };
}
