import * as React from 'react';
import { Button } from 'antd';

import { getCategories } from '../firebase/firebase-todo';
import { SettingsModal } from '../settings';
import { TodoList } from '../todo-list';
import './App.css';

interface State {
  isSettingsModalOpen: boolean;
  categories: string[];
}

export class App extends React.Component<{}, State> {
  public state = {
    isSettingsModalOpen: false,
    categories: [],
  };

  public componentWillMount() {
    this.getCategories();
  }

  public render() {
    const { categories, isSettingsModalOpen } = this.state;

    return (
      <div className="app">
        <h1>ToDo List!</h1>
        <Button size="large" className="settings" shape="circle" icon="setting" onClick={this.openSettingsModal} />
        <TodoList categories={categories} />
        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={this.closeSettingsModal}
          onUpdate={this.getCategories}
          categories={categories}
        />
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
