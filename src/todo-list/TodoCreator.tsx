import * as React from 'react';

import { addTodoItem } from '../firebase/firebase-todo';

type Props = {
  onCreate: Function,
};

type State = {
  value: string,
};

export class TodoCreator extends React.PureComponent<Props, State> {
  public state: State = {
    value: '',
  };

  public render() {
    const style = {
      margin: '5px auto',
    };
    return (
      <div style={style}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="button" value="Add todo" onClick={this.handleSubmit} />
      </div>
    );
  }

  private handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ value: (event.target as HTMLInputElement).value });
  }

  private handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    addTodoItem(this.state.value).then(() => {
      this.props.onCreate();
      this.setState({ value: '' });
    });
  }
}
