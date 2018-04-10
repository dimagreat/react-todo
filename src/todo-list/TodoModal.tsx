import * as React from 'react';
import { Input, message, Modal } from 'antd';

import { addTodoItem } from '../firebase/firebase-todo';

interface Props {
  onCreate: () => void;
  onClose: () => void;
  isOpen: boolean;
}

interface State {
  title: string;
  isLoading: boolean;
}

export class TodoModal extends React.PureComponent<Props, State> {
  public state: State = {
    title: '',
    isLoading: false,
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
        <Input placeholder="Title" value={title} onChange={this.updateTitle} />
      </Modal>
    );
  }

  private updateTitle = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ title: (event.target as HTMLInputElement).value });
  };

  private createTodo = () => {
    this.setState({ isLoading: true });
    addTodoItem(this.state.title).then(this.onCreateSuccess);
  };

  private onCreateSuccess = () => {
    this.setState({ isLoading: false });
    message.success('Todo Created!');
    this.props.onCreate();
    this.setState({ title: '' });
    this.props.onClose();
  };
}
