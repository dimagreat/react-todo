// @flow
import React from 'react';

import { addTodoItem } from '../firebase/firebase-todo';

type Props = {
  onCreate: () => void,
};

type State = {
  value: string,
};

export class TodoCreator extends React.PureComponent<Props, State> {
  state: State = {
    value: '',
  };

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    addTodoItem(this.state.value).then(() => {
      this.props.onCreate();
      this.setState({ value: '' });
    });
  };

  render() {
    const style = {
      margin: '5px auto',
    };
    return (
      <form style={style} onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Add todo" />
      </form>
    );
  }
}
