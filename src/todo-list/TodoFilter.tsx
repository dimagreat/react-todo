import * as React from 'react';

import { ALL, COMPLETED, NOT_COMPLETED } from './constants';

interface Props {
  onChangeFilter: (value: string) => void;
}

interface State {
  value: string;
}

export class TodoFilter extends React.PureComponent<Props, State> {
  public state: State = {
    value: ALL,
  };

  public render() {
    const style = {
      margin: '5px auto',
      width: '200px',
    };
    return (
      <select style={style} onChange={this.onChange} value={this.state.value}>
        <option value={ALL}>All</option>
        <option value={COMPLETED}>Completed</option>
        <option value={NOT_COMPLETED}>Not Completed</option>
      </select>
    );
  }

  private onChange = (event: React.FormEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const { value } = event.target as HTMLSelectElement;
    this.setState({ value });
    this.props.onChangeFilter(value);
  }
}
