import * as React from 'react';

import { Card, Icon, message } from 'antd';

import { TodoEntity } from './constants';

import { removeTodoItem, updateTodoItem } from '../firebase/firebase-todo';

interface Props {
  todo: TodoEntity;
  onComplete: () => void;
}

export class Todo extends React.PureComponent<Props> {
  public render() {
    const style = {
      title: {
        marginBottom: '0',
      },
      wrapper: {
        margin: '10px auto',
        width: '300px',
      },
    };
    const { name, isCompleted } = this.props.todo;

    const actions = [
      isCompleted ? (
        <Icon key={0} type="check" />
      ) : (
        <Icon key={0} type="check-circle" onClick={this.completeTodo} />
      ),
      <Icon key={1} type="close-circle" onClick={this.removeTodo} />,
    ];
    return (
      <Card hoverable={true} style={style.wrapper} actions={actions}>
        <h1 style={style.title}>{name}</h1>
      </Card>
    );
  }

  private completeTodo = () => {
    const { todo, onComplete } = this.props;
    updateTodoItem(todo.id, {
      ...todo,
      isCompleted: true,
    }).then(() => {
      message.success('Todo Completed');
      onComplete();
    });
  };

  private removeTodo = () => {
    const { todo: { id }, onComplete } = this.props;
    removeTodoItem(id).then(() => {
      message.error('Todo Removed');
      onComplete();
    });
  };
}
