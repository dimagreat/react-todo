import * as React from 'react';
import { Form, Tag, Input, Tooltip, Icon, message, Modal } from 'antd';

import './SettingsModal.css';
import { updateCategories } from '../firebase/firebase-todo';

const FormItem = Form.Item;

interface Props {
  onUpdate: () => void;
  onClose: () => void;
  isOpen: boolean;
  categories: string[];
}

interface State {
  isLoading: boolean;
  inputVisible: boolean;
  tags: string[];
  inputValue: string;
}

export class SettingsModal extends React.PureComponent<Props, State> {
  public state = {
    isLoading: false,
    inputVisible: false,
    inputValue: '',
    tags: [],
  };
  private input: Input;

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setState({ tags: this.props.categories });
    }
  }

  public render() {
    const { isOpen, onClose } = this.props;
    const { isLoading, inputVisible, inputValue, tags } = this.state;

    return (
      <Modal
        title="Settings"
        visible={isOpen}
        onCancel={onClose}
        confirmLoading={isLoading}
        okText="Save"
        className="SettingsModal"
        onOk={this.updateCategories}
      >
        <Form layout="vertical">
          <FormItem label="Customize categories:">
            {tags.map((tag: string, index) => {
              const isLongTag = tag.length > 20;
              const tagElem = (
                <Tag
                  className="margin-b"
                  key={tag}
                  closable={true}
                  afterClose={() => this.removeCategory(tag)}
                >
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
              ) : (
                tagElem
              );
            })}
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                className="input"
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <div className="new-category-wrapper" onClick={this.showInput}>
                <Tag className="new-category">
                  <Icon type="plus" /> Add Category
                </Tag>
              </div>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }

  private removeCategory = (removedTag: string) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  };

  private showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  private handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ inputValue: (event.target as HTMLInputElement).value });
  };

  private handleInputConfirm = () => {
    const { tags, inputValue } = this.state;
    if (inputValue && !(tags as string[]).includes(inputValue)) {
      (tags as string[]) = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  private saveInputRef = (input: Input) => (this.input = input);

  private updateCategories = () => {
    this.setState({ isLoading: true });
    updateCategories(this.state.tags).then(this.onCreateSuccess);
  };

  private onCreateSuccess = () => {
    this.setState({ isLoading: false });
    message.success('Categories Update!');
    this.props.onUpdate();
    this.props.onClose();
  };
}
