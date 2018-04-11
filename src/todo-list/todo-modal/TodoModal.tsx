import * as React from 'react';
import { Input, message, Modal } from 'antd';

import { addTodoItem } from '../../firebase/firebase-todo';
import { SetPriority } from './SetPriority';
import {  NORMAL } from '../constants';

interface Props {
  onCreate: () => void;
  onClose: () => void;
  isOpen: boolean;
}

interface State {
  title: string;
  isLoading: boolean;
  priority: string;
}

export class TodoModal extends React.PureComponent<Props, State> {
  public state: State = {
    title: '',
    priority: NORMAL,
    isLoading: false,
  };
  private style = {
    marginBottom: 15,
  };

  public render() {
    const { title, isLoading } = this.state;
    const { isOpen, onClose } = this.props;

    return (
      <Modal
        title="Todo"
        visible={isOpen}
        onCancel={onClose}
        confirmLoading={isLoading}
        onOk={this.createTodo}
      >
        <Input style={this.style} placeholder="Title" value={title} onChange={this.updateTitle} />
        <div style={this.style}>
          <SetPriority onChangePriority={this.updatePriority} />
        </div>
      </Modal>
    );
  }

  private updatePriority = (priority: string) => this.setState({ priority });

  private updateTitle = (event: React.FormEvent<HTMLInputElement>) =>
    this.setState({ title: (event.target as HTMLInputElement).value });

  private createTodo = () => {
    this.setState({ isLoading: true });
    const { title, priority } = this.state;
    addTodoItem({ title, priority }).then(this.onCreateSuccess);
  };

  private onCreateSuccess = () => {
    this.setState({ isLoading: false });
    message.success('Todo Created!');
    this.props.onCreate();
    this.setState({ title: '' });
    this.props.onClose();
  };
}
