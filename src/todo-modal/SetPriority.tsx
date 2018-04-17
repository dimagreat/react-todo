import * as React from 'react';

import { HIGH, NORMAL, LOW } from '../shared/constants';
import { DropdownMenu, PriorityIcon } from '../components';

const PRIORITY_MENU = {
  [HIGH]: 'High',
  [NORMAL]: 'Normal',
  [LOW]: 'Low',
};

interface Props {
  onChangePriority: (priority: string) => void;
}

interface State {
  value: string;
  icon: string;
}

export class SetPriority extends React.PureComponent<Props, State> {
  public state = {
    value: PRIORITY_MENU[NORMAL],
    icon: NORMAL,
  };
  private style = {
    display: 'flex',
    justifyContent: 'space-around' as 'space-around',
    alignItems: 'center' as 'center',
  };

  public render() {
    return (
      <div style={this.style}>
        <DropdownMenu values={PRIORITY_MENU} default={PRIORITY_MENU[NORMAL]} onChange={this.onChange} />
        <PriorityIcon icon={this.state.icon} />
      </div>
    );
  }

  private onChange = (value: string) => {
    this.setState({ icon: value });
    this.props.onChangePriority(value);
  };
}
