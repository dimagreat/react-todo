// @flow
import React from 'react';

import { ALL, COMPLETED, NOT_COMPLETED } from './constants';

type Props = {
  onChangeFilter: (value: string) => void,
};

type State = {
  value: string,
};

export class TodoFilter extends React.PureComponent<Props, State> {
  state: State = {
    value: ALL,
  };

  onChange = (event: SyntheticInputEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const { value } = event.target;
    this.setState({ value });
    this.props.onChangeFilter(value);
  };

  render() {
    const style = {
      width: '200px',
      margin: '5px auto',
    };
    return (
      <select style={style} onChange={this.onChange} value={this.state.value}>
        <option value={ALL}>All</option>
        <option value={COMPLETED}>Completed</option>
        <option value={NOT_COMPLETED}>Not Completed</option>
      </select>
    );
  }
}
