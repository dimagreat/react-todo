import * as React from 'react';
import { Button } from 'antd';

import { getActiveTodos } from '../firebase/firebase-todo';
import { ALL, COMPLETED, NOT_COMPLETED, TodoEntity } from './constants';
import { Todo } from './Todo';
import { TodoModal } from './todo-modal/TodoModal';
import { TodoFilter } from './TodoFilter';

interface State {
  todos: TodoEntity[];
  filter: (todo: TodoEntity) => boolean;
  isTodoModalOpen: boolean;
}

export class TodoList extends React.PureComponent<{}, State> {
  public state: State = {
    filter: () => true,
    todos: [],
    isTodoModalOpen: false,
  };

  public componentWillMount() {
    this.getTodos();
  }

  public render() {
    return (
      <div>
        <Button type="primary" onClick={this.openTodoModal}>
          Create Todo
        </Button>
        <TodoModal
          isOpen={this.state.isTodoModalOpen}
          onClose={this.closeTodoModal}
          onCreate={this.getTodos}
        />
        <TodoFilter onChangeFilter={this.onChangeFilter} />
        <div>
          {this.state.todos.map((todo: TodoEntity, index) => (
            <Todo todo={todo} onComplete={this.getTodos} key={index} />
          ))}
        </div>
      </div>
    );
  }

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
