import * as React from 'react';
import { Form, Input, message, Modal } from 'antd';

import { addTodoItem } from '../firebase/firebase-todo';
import { SetPriority } from './SetPriority/SetPriority';
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
  model: {
    title: string;
    description: string;
    priority: string;
    categories: string[];
  };
  isLoading: boolean;
  isValid: boolean;
}

export class TodoModal extends React.PureComponent<Props, State> {
  public state: State = {
    model: {
      title: '',
      description: '',
      priority: NORMAL,
      categories: [],
    },
    isLoading: false,
    isValid: false,
  };
  private defaultState = this.state;

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isOpen && this.props.isOpen !== nextProps.isOpen) {
      this.setState({ ...this.defaultState });
    }
  }

  public render() {
    const { isValid, model: { title, description }, isLoading } = this.state;
    const { isOpen, onClose } = this.props;
    const validateStatus = isValid ? 'success' : 'error';
    return (
      <Modal
        title="Todo"
        visible={isOpen}
        onCancel={onClose}
        confirmLoading={isLoading}
        onOk={this.createTodo}
      >
        <Form>
          <FormItem
            label="Title"
            required={true}
            validateStatus={validateStatus}
            help={!isValid && 'Should not be empty'}
          >
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
              categories={this.props.categories}
              onSelectCategory={this.updateCategories}
            />
          </FormItem>
        </Form>
      </Modal>
    );
  }

  private updateCategories = (categories: string[]) => this.update('categories', categories);

  private updatePriority = (priority: string) => this.update('priority', priority);

  private updateTitle = (event: React.FormEvent<HTMLInputElement>) =>
    this.update('title', (event.target as HTMLInputElement).value);

  private updateDescription = (event: React.FormEvent<HTMLTextAreaElement>) =>
    this.update('description', (event.target as HTMLTextAreaElement).value);

  private update = (field: string, value: string | string[]) => {
    this.setState({ model: { ...this.state.model, [field]: value } }, () => {
      if (field === 'title') {
        this.validate();
      }
    });
  };

  private validate() {
    this.setState({ isValid: this.state.model.title.length > 0 });
  }

  private createTodo = () => {
    if (!this.state.isValid) {
      return;
    }
    this.setState({ isLoading: true });
    addTodoItem(this.state.model).then(this.onCreateSuccess);
  };

  private onCreateSuccess = () => {
    message.success('Todo Created!');
    this.props.onCreate();
    this.setState({ ...this.defaultState });
    this.props.onClose();
  };
}
