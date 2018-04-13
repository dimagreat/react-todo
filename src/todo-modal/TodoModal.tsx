import * as React from 'react';
import { Input, message, Modal } from 'antd';

import { addTodoItem } from '../firebase/firebase-todo';
import { SetPriority } from './SetPriority';
import { SetCategory } from './SetCategory';
import { NORMAL } from '../todo-list/constants';

const Textarea = Input.TextArea;

interface Props {
  onCreate: () => void;
  onClose: () => void;
  isOpen: boolean;
  categories: string[];
}

interface State {
  title: string;
  description: string;
  isLoading: boolean;
  priority: string;
  selectedCategories: string[];
}

export class TodoModal extends React.PureComponent<Props, State> {
  public state: State = {
    title: '',
    description: '',
    priority: NORMAL,
    isLoading: false,
    selectedCategories: [],
  };
  private defaultState = this.state;
  private style = {
    marginBottom: 15,
  };

  public render() {
    const { title, description, isLoading } = this.state;
    const { isOpen, onClose, categories } = this.props;
    return (
      <Modal
        title="Todo"
        visible={isOpen}
        onCancel={onClose}
        confirmLoading={isLoading}
        onOk={this.createTodo}
      >
        <Input style={this.style} placeholder="Title" value={title} onChange={this.updateTitle} />
        <Textarea
          style={this.style}
          placeholder="Description"
          value={description}
          onChange={this.updateDescription}
          rows={4}
        />
        <div style={this.style}>
          <SetPriority onChangePriority={this.updatePriority} />
        </div>
        <div style={this.style}>
          <SetCategory categories={categories} onSelectCategory={this.updateCategories} />
        </div>
      </Modal>
    );
  }

  private updateCategories = (selectedCategories: string[]) =>
    this.setState({ selectedCategories });

  private updatePriority = (priority: string) => this.setState({ priority });

  private updateTitle = (event: React.FormEvent<HTMLInputElement>) =>
    this.setState({ title: (event.target as HTMLInputElement).value });

  private updateDescription = (event: React.FormEvent<HTMLTextAreaElement>) =>
    this.setState({ description: (event.target as HTMLTextAreaElement).value });

  private createTodo = () => {
    this.setState({ isLoading: true });
    const { title, priority, description, selectedCategories } = this.state;
    const todo = {
      title,
      priority,
      description,
      categories: selectedCategories,
    };
    addTodoItem(todo).then(this.onCreateSuccess);
  };

  private onCreateSuccess = () => {
    message.success('Todo Created!');
    this.props.onCreate();
    this.setState({ ...this.defaultState, selectedCategories: [] });
    this.props.onClose();
  };
}
