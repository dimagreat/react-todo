import * as React from 'react';
import { Button, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import { getActiveTodos, getCategories } from '../firebase/firebase-todo';
import {
  PRIORITY_MENU,
  STATUS_MENU, ALL,
  COMPLETED, NOT_COMPLETED, TodoEntity
} from '../shared/constants';
import { Todo } from './Todo';
import { TodoModal } from '../todo-modal/TodoModal';
import { CategoriesModal } from './CategoriesModal';
import { DropdownMenu } from '../components';

interface Filter {
  status: string;
  priority: string;
  withDescription: boolean;
}

interface State {
  todos: TodoEntity[];
  filteredTodos: TodoEntity[];
  categories: string[];
  filter: Filter;
  isTodoModalOpen: boolean;
  isCategoriesModalOpen: boolean;
}

export class TodoList extends React.PureComponent<{}, State> {
  public state: State = {
    filter: {
      status: NOT_COMPLETED,
      priority: '',
      withDescription: false,
    },
    todos: [],
    filteredTodos: [],
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
    const { isTodoModalOpen, isCategoriesModalOpen, filteredTodos, categories } = this.state;

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
        <DropdownMenu values={STATUS_MENU} default={STATUS_MENU[NOT_COMPLETED]} onChange={this.onChangeStatusFilter} />
        <DropdownMenu values={PRIORITY_MENU} default={PRIORITY_MENU[ALL]} onChange={this.onChangePriorityFilter} />
        <Checkbox onChange={this.onChangeDescriptionFilter}>Show Items with description</Checkbox>
        <div>
          {filteredTodos.map((todo: TodoEntity, index) => (
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

  private onChangeStatusFilter = (value: string) => this.onChangeFilter('status', value);

  private onChangePriorityFilter = (value: string) => this.onChangeFilter('priority', value);

  private onChangeDescriptionFilter = (event: CheckboxChangeEvent) =>
    this.onChangeFilter('withDescription', event.target.checked);

  private onChangeFilter = (field: string, value: string | boolean) => {
    this.setState({ filter: { ...this.state.filter, [field]: value } }, this.filterTodos);
  };

  private filterTodos = () => {
    const { todos, filter } = this.state;
    const filteredTodos = todos.reduce(
      (acc: TodoEntity[], todo: TodoEntity) => {
        if (filter.status === COMPLETED && !todo.isCompleted) {
          return acc;
        }
        if (filter.status === NOT_COMPLETED && todo.isCompleted) {
          return acc;
        }
        if (filter.priority && filter.priority !== ALL && filter.priority !== todo.priority) {
          return acc;
        }
        if (filter.withDescription && todo.description.length === 0) {
          return acc;
        }
        acc.push(todo);
        return acc;
      },
      []);
    this.setState({ filteredTodos });
  }

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
      }));
    this.setState({ todos: processedTodos }, this.filterTodos);
  };
}
