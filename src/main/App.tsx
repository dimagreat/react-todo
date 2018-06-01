import * as React from 'react';
import { Alert, Button } from 'antd';
import * as firebase from 'firebase';

import './App.css';

import { SettingsModal } from '../settings';
import { TodoList } from '../todo-list';
import { UserModal } from '../user-modal';

import { getCategories } from '../firebase/firebase-todo';

interface Props {
  user: firebase.UserInfo;
}

interface State {
  isSettingsModalOpen: boolean;
  isUserModalOpen: boolean;
  categories: string[];
}

export class App extends React.Component<Props, State> {
  public state = {
    isSettingsModalOpen: false,
    isUserModalOpen: false,
    categories: [],
  };

  public componentWillMount() {
    this.getCategories();
  }

  public render() {
    const { categories, isSettingsModalOpen, isUserModalOpen } = this.state;
    const { user } = this.props;

    if (!process.env.REACT_APP_FIREBASE_API) {
      return (
        <Alert
          className="App-error"
          message="Error"
          description="Setup firebase before app launch."
          type="error"
          showIcon={true}
        />
      );
    }

    return (
      <div className="App">
        <h1>ToDo List!</h1>
        <Button
          size="large"
          className="Settings"
          shape="circle"
          icon="setting"
          onClick={this.openSettingsModal}
        />
        <Button
          size="large"
          className="User"
          shape="circle"
          icon="user"
          onClick={this.openUserModal}
        />
        <TodoList categories={categories} />
        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={this.closeSettingsModal}
          onUpdate={this.getCategories}
          categories={categories}
        />
        <UserModal user={user} isOpen={isUserModalOpen} onClose={this.closeUserModal} />
      </div>
    );
  }

  private getCategories = async () => {
    const data = await getCategories();
    if (!data || !data.val()) {
      return;
    }
    const categories = data.val();
    this.setState({ categories });
  };

  private openUserModal = () => this.setState({ isUserModalOpen: true });

  private closeUserModal = () => this.setState({ isUserModalOpen: false });

  private openSettingsModal = () => this.setState({ isSettingsModalOpen: true });

  private closeSettingsModal = () => this.setState({ isSettingsModalOpen: false });
}
