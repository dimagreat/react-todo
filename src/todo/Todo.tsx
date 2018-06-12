import * as React from 'react';
import { Popconfirm, Tooltip, Card, Icon, Tag, message } from 'antd';

import './Todo.css';
import { TodoEntity } from '../shared/constants';
import { PriorityIcon } from '../components/PriorityIcon';
import { firebaseApi } from '../firebase/firebase-api';

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
      <Popconfirm
        title="Do you want to remove this todo?"
        onConfirm={this.removeTodo}
        placement="right"
        okText="Yes"
        cancelText="No"
        key={1}
      >
        <Icon type="close-circle" />
      </Popconfirm>,
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

  private completeTodo = async () => {
    const { todo, onComplete } = this.props;
    await firebaseApi.updateTodoItem(todo.id, {
      ...todo,
      isCompleted: true,
    });
    message.success('Todo Completed');
    onComplete();
  };

  private removeTodo = async () => {
    const { todo: { id }, onComplete } = this.props;

    await firebaseApi.removeTodoItem(id);
    onComplete();
    message.error('Todo Removed');
  };
}
