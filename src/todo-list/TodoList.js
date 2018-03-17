// @flow
import React from 'react';

import { Todo } from './Todo';
import { TodoCreator } from './TodoCreator';
import { TodoFilter } from './TodoFilter';
import { getActiveTodos } from '../firebase/firebase-todo';
import { ALL, COMPLETED, NOT_COMPLETED } from './constants';

export type TodoEntity = {
  name: string,
};

type Props = {};

type State = {
  todos: TodoEntity[],
  filter: (todo?: TodoEntity) => boolean,
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
    const { todos } = this.state;
    return (
      <div>
        <TodoCreator onCreate={this.getTodos} />
        <TodoFilter onChangeFilter={this.onChangeFilter} />
        <div>
          {Object.keys(todos).map((id, index) => {
            const todo = todos[id];
            return (
              <Todo
                name={todo.name}
                isCompleted={todo.isCompleted}
                id={id}
                onComplete={this.getTodos}
                key={index}
              />
            );
          })}
        </div>
      </div>
    );
  }

  onChangeFilter = (filter: string) => {
    if (filter === ALL) {
      this.setState({ filter: () => true });
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
    const todos = Object.values(data.val()).filter(this.state.filter);
    this.setState({ todos });
  };
}
