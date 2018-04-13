import * as React from 'react';
import { Button } from 'antd';

import { getActiveTodos, getCategories } from '../firebase/firebase-todo';
import { ALL, COMPLETED, NOT_COMPLETED, TodoEntity } from './constants';
import { Todo } from './Todo';
import { TodoModal } from '../todo-modal/TodoModal';
import { TodoFilter } from './TodoFilter';
import { CategoriesModal } from './CategoriesModal';

interface State {
  todos: TodoEntity[];
  categories: string[];
  filter: (todo: TodoEntity) => boolean;
  isTodoModalOpen: boolean;
  isCategoriesModalOpen: boolean;
}

export class TodoList extends React.PureComponent<{}, State> {
  public state: State = {
    filter: () => true,
    todos: [],
    categories: [],
    isTodoModalOpen: false,
    isCategoriesModalOpen: false,
  };
  private style = {
    buttons: {
      display: 'flex',
      justifyContent: 'space-around' as 'space-around',
      width: 400,
      margin: '10px auto',
    },
  };

  public componentWillMount() {
    this.getTodos();
    this.getCategories();
  }

  public render() {
    const { isTodoModalOpen, isCategoriesModalOpen, todos, categories } = this.state;

    return (
      <div>
        <div style={this.style.buttons}>
          <Button type="primary" onClick={this.openTodoModal}>
            Create Todo
          </Button>
          <Button type="primary" onClick={this.openCategoriesModal}>
            Update Categories
          </Button>
        </div>

        <TodoModal
          isOpen={isTodoModalOpen}
          onClose={this.closeTodoModal}
          onCreate={this.getTodos}
          categories={categories}
        />
        <CategoriesModal
          isOpen={isCategoriesModalOpen}
          onClose={this.closeCategoriesModal}
          onUpdate={this.getCategories}
          categories={categories}
        />
        <TodoFilter onChangeFilter={this.onChangeFilter} />
        <div>
          {todos.map((todo: TodoEntity, index) => (
            <Todo todo={todo} onComplete={this.getTodos} key={index} />
          ))}
        </div>
      </div>
    );
  }

  private openCategoriesModal = () => this.setState({ isCategoriesModalOpen: true });

  private closeCategoriesModal = () => this.setState({ isCategoriesModalOpen: false });

  private openTodoModal = () => this.setState({ isTodoModalOpen: true });

  private closeTodoModal = () => this.setState({ isTodoModalOpen: false });

  private onChangeFilter = (filter: string) => {
    if (filter === ALL) {
      this.setState({ filter: (todo: TodoEntity) => true });
    }
    if (filter === COMPLETED) {
      this.setState({ filter: (todo: TodoEntity) => todo.isCompleted });
    }
    if (filter === NOT_COMPLETED) {
      this.setState({ filter: (todo: TodoEntity) => !todo.isCompleted });
    }
    this.getTodos();
  };

  private getCategories = async () => {
    const data = await getCategories();
    if (!data || !data.val()) {
      return;
    }
    const categories = data.val();
    this.setState({ categories });
  };

  private getTodos = async () => {
    const data = await getActiveTodos();
    if (!data || !data.val()) {
      return;
    }
    const todos = data.val();
    const processedTodos: TodoEntity[] = Object.keys(todos)
      .map((key, index) => ({
        ...todos[key],
        id: key,
      }))
      .filter(this.state.filter);
    this.setState({ todos: processedTodos });
  };
}
