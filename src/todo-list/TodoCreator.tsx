import * as React from 'react';

import Button from 'antd/lib/button';

import { addTodoItem } from '../firebase/firebase-todo';

interface Props {
  onCreate: () => void;
}

interface State {
  value: string;
}

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
        <Button onClick={this.handleSubmit} type="primary">
          Add Todo
        </Button>
      </div>
    );
  }

  private handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ value: (event.target as HTMLInputElement).value });
  };

  private handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    addTodoItem(this.state.value).then(() => {
      this.props.onCreate();
      this.setState({ value: '' });
    });
  };
}
