import * as React from 'react';
import { Tooltip, Card, Icon, Tag, message } from 'antd';

import { TodoEntity } from './constants';
import { PriorityIcon } from '../components/PriorityIcon';
import { removeTodoItem, updateTodoItem } from '../firebase/firebase-todo';

interface Props {
  todo: TodoEntity;
  onComplete: () => void;
}

export class Todo extends React.PureComponent<Props> {
  private style = {
    title: {
      marginBottom: '0',
    },
    wrapper: {
      margin: '10px auto',
      width: '300px',
    },
    element: {
      display: 'block',
      marginBottom: 5,
    },
  };
  public render() {
    const { title, description, isCompleted, priority, categories } = this.props.todo;
    const { element, wrapper, title: titleStyle } = this.style;
    const actions = [
      isCompleted ? (
        <Icon key={0} type="check" />
      ) : (
        <Icon key={0} type="check-circle" onClick={this.completeTodo} />
      ),
      <Icon key={1} type="close-circle" onClick={this.removeTodo} />,
    ];
    return (
      <Tooltip placement="right" title={description}>
        <Card hoverable={true} style={wrapper} actions={actions}>
          <h1 style={titleStyle}>{title}</h1>
          <div style={element}>
            <PriorityIcon icon={priority} />
          </div>
          <div style={element}>
            {categories.map((category: string, index: number) => <Tag key={index}>{category}</Tag>)}
          </div>
        </Card>
      </Tooltip>
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
