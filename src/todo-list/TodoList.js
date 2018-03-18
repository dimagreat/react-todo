// @flow
import React from 'react';

import { Todo } from './Todo';
import { TodoCreator } from './TodoCreator';
import { TodoFilter } from './TodoFilter';
import { getActiveTodos } from '../firebase/firebase-todo';
import { ALL, COMPLETED, NOT_COMPLETED, type TodoEntity } from './constants';

type Props = {};

type State = {
  todos: TodoEntity[],
  filter: (todo: TodoEntity) => boolean,
};

export class TodoList extends React.PureComponent<Props, State> {
  state: State = {
    todos: [],
    filter: () => true,
  };

  componentWillMount() {
    this.getTodos();
  }

  render() {
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

  onChangeFilter = (filter: string) => {
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

  getTodos = async () => {
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
