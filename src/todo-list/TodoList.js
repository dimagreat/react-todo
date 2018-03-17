// @flow
import React from 'react';

import { Todo } from './Todo';
import { TodoCreator } from './TodoCreator';
import { getActiveTodos } from '../firebase/firebase-todo';

export type TodoEntity = {
  name: string,
};

type Props = {};

type State = {
  todos: TodoEntity[],
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
  };

  componentWillMount() {
    this.getTodos();
  }

  render() {
    const { todos } = this.state;
    return (
      <div>
        <TodoCreator onCreate={this.getTodos} />
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

  getTodos = async () => {
    const data = await getActiveTodos();
    if (!data || !data.val()) {
      return;
    }
    this.setState({ todos: data.val() });
  };
}
