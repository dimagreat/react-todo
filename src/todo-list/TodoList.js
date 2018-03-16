// @flow
import React from 'react';

import { Todo } from './Todo';
import { TodoCreator } from './TodoCreator';
import { getTodoDB } from '../firebase/todos';

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
        <TodoCreator createTodo={this.createTodo} />
        <div>{todos.map((todo, index) => <Todo {...todo} key={index} />)}</div>
      </div>
    );
  }

  getTodos = () => {
    getTodoDB().then((tasks: TodoEntiry[]) => {
      this.setState({ todos: tasks.val().todos });
    });
  };

  createTodo = () => {
    this.getTodos();
  };
}
