import * as React from 'react';
import { Alert, Button } from 'antd';
import * as firebase from 'firebase';

import './App.css';

import { SettingsModal } from '../settings';
import { TodoList } from '../todo-list';
import { UserModal } from '../user-modal';

import { getCategories } from '../firebase/firebase-todo';

interface Props {
  user: firebase.User;
}

interface State {
  isSettingsModalOpen: boolean;
  categories: string[];
}

export class App extends React.Component<Props, State> {
  public state = {
    isSettingsModalOpen: false,
    categories: [],
  };

  public componentWillMount() {
    this.getCategories();
  }

  public render() {
    const { categories, isSettingsModalOpen } = this.state;

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
        <TodoList categories={categories} />
        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={this.closeSettingsModal}
          onUpdate={this.getCategories}
          categories={categories}
        />
        <UserModal />
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

  private openSettingsModal = () => this.setState({ isSettingsModalOpen: true });

  private closeSettingsModal = () => this.setState({ isSettingsModalOpen: false });
}
