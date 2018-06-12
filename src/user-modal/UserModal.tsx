import * as React from 'react';
import { Form, Button, Modal } from 'antd';
import * as firebase from 'firebase';

import { firebaseAuth } from '../firebase';

import { LOGIN_ROUTE } from '../router';

interface Props {
  user: firebase.UserInfo;
  isOpen: boolean;
  onClose(): void;
  changeRoute(route: string): void;
}

const FormItem = Form.Item;

export class UserModal extends React.PureComponent<Props> {
  public render() {
    const { user: { displayName }, isOpen, onClose } = this.props;
    return (
      <Modal
        title="Settings"
        visible={isOpen}
        onCancel={onClose}
        okText="Save"
        className="SettingsModal"
        footer={[
          <Button key="back" onClick={onClose}>
            Cancel
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <FormItem label="User:">{displayName}</FormItem>
          <Button onClick={this.signOut}>Sign Out</Button>
        </Form>
      </Modal>
    );
  }

  private signOut = () => {
    firebaseAuth.signOut();
    this.props.changeRoute(LOGIN_ROUTE);
  };
}
