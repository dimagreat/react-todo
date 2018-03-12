// @flow
import React from 'react';

import { addTodoItem } from '../firebase';

type Props = {
  createTask: (value: string) => void,
};

type State = {
  value: string,
};

export class TaskCreator extends React.Component<Props, State> {
  state: State = {
    value: '',
  };

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    this.props.createTask(this.state.value);
    addTodoItem(this.state.value).then(() => {
      this.setState({ value: '' });
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Add task" />
      </form>
    );
  }
}
