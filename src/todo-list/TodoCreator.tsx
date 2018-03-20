import * as React from 'react';

import { Input, message } from 'antd';

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
      margin: '5px auto 15px',
      width: 320,
    };
    return (
      <div style={style}>
        <Input.Search
          placeholder="Todo name"
          enterButton="Add Todo"
          value={this.state.value}
          onChange={this.handleChange}
          onSearch={this.handleSubmit}
        />
      </div>
    );
  }

  private handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ value: (event.target as HTMLInputElement).value });
  };

  private handleSubmit = (value: string) => {
    addTodoItem(value).then(() => {
      message.success('Todo Created!');
      this.props.onCreate();
      this.setState({ value: '' });
    });
  };
}
