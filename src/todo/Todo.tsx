import * as React from 'react';
import { Tooltip, Card, Icon, Tag, message } from 'antd';

import './Todo.css';
import { TodoEntity } from '../shared/constants';
import { PriorityIcon } from '../components/PriorityIcon';
import { removeTodoItem, updateTodoItem } from '../firebase/firebase-todo';

interface Props {
  todo: TodoEntity;
  onComplete: () => void;
}

export class Todo extends React.PureComponent<Props> {
  public render() {
    const { title, description, isCompleted, priority, categories } = this.props.todo;
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
        <Card className="todo" hoverable={true} actions={actions}>
          <h1 className="title">{title}</h1>
          <div className="priority">
            <PriorityIcon icon={priority} />
          </div>
          {categories &&
            categories.map((category: string, index: number) => (
              <Tag className="margin-b" key={index}>
                {category}
              </Tag>
            ))}
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
