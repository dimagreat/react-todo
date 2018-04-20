import * as React from 'react';
import { Button } from 'antd';

import './TodoList.css';
import { getActiveTodos } from '../firebase/firebase-todo';
import { ALL, COMPLETED, NOT_COMPLETED, TodoEntity } from '../shared/constants';
import { Todo } from '../todo';
import { TodoModal } from '../todo-modal';
import { Filter, FilterOptions } from '../filter';

interface Props {
  categories: string[];
}

interface State {
  todos: TodoEntity[];
  filteredTodos: TodoEntity[];
  isTodoModalOpen: boolean;
  filter?: FilterOptions;
}

export class TodoList extends React.PureComponent<Props, State> {
  public state: State = {
    todos: [],
    filteredTodos: [],
    isTodoModalOpen: false,
  };

  public componentWillMount() {
    this.getTodos();
  }

  public render() {
    const { isTodoModalOpen, filteredTodos } = this.state;
    const { categories } = this.props;

    return (
      <div className="TodoList">
        <div className="buttons">
          <Button type="primary" onClick={this.openTodoModal}>
            Create Todo
          </Button>
        </div>

        <TodoModal
          isOpen={isTodoModalOpen}
          onClose={this.closeTodoModal}
          onCreate={this.getTodos}
          categories={categories}
        />
        <Filter onUpdate={this.updateFilter} />
        <div>
          {filteredTodos.map((todo: TodoEntity, index) => (
            <Todo todo={todo} onComplete={this.getTodos} key={index} />
          ))}
        </div>
      </div>
    );
  }

  private openTodoModal = () => this.setState({ isTodoModalOpen: true });

  private closeTodoModal = () => this.setState({ isTodoModalOpen: false });

  private updateFilter = (filter: FilterOptions) => this.setState({ filter }, this.filterTodos);

  private filterTodos = () => {
    const { todos, filter } = this.state;
    if (!filter) {
      return;
    }
    const filteredTodos = todos.reduce((acc: TodoEntity[], todo: TodoEntity) => {
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
    }, []);
    this.setState({ filteredTodos });
  };

  private getTodos = async () => {
    const data = await getActiveTodos();
    if (!data || !data.val()) {
      return;
    }
    const todos = data.val();
    const processedTodos: TodoEntity[] = Object.keys(todos).map((key, index) => ({
      ...todos[key],
      id: key,
    }));
    this.setState({ todos: processedTodos }, this.filterTodos);
  };
}
