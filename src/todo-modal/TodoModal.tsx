import * as React from 'react';
import { Form, Input, message, Modal } from 'antd';

import { addTodoItem } from '../firebase/firebase-todo';
import { SetPriority } from './SetPriority';
import { SetCategory } from './SetCategory';
import { NORMAL } from '../shared/constants';

const Textarea = Input.TextArea;
const FormItem = Form.Item;

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
        <FormItem label="Title">
          <Input value={title} onChange={this.updateTitle} />
        </FormItem>
        <FormItem label="Description">
          <Textarea value={description} onChange={this.updateDescription} rows={4} />
        </FormItem>
        <FormItem label="Priority">
          <SetPriority isOpen={isOpen} onChangePriority={this.updatePriority} />
        </FormItem>
        <FormItem label="Categories">
          <SetCategory
            isOpen={isOpen}
            categories={categories}
            onSelectCategory={this.updateCategories}
          />
        </FormItem>
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
