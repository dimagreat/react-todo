import * as React from 'react';

import { Todo } from './Todo';
import { TodoCreator } from './TodoCreator';
import { TodoFilter } from './TodoFilter';
import { ALL, COMPLETED, TodoEntity, NOT_COMPLETED } from './constants';
import { getActiveTodos } from '../firebase/firebase-todo';

interface State {
  todos: TodoEntity[];
  filter: (todo: TodoEntity) => boolean;
}

export class TodoList extends React.PureComponent<{}, State> {
  public state: State = {
    filter: () => true,
    todos: [],
  };

  public componentWillMount() {
    this.getTodos();
  }

  public render() {
    return (
      <div>
        <TodoCreator onCreate={this.getTodos} />
        <TodoFilter onChangeFilter={this.onChangeFilter} />
        <div>
          {this.state.todos.map((todo: TodoEntity, index) => (
            <Todo todo={todo} onComplete={this.getTodos} key={index} />
          ))}
        </div>
      </div>
    );
  }

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
  }

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
  }
}
