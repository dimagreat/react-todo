import * as React from 'react';
import { Button, Menu, Dropdown, Icon } from 'antd';
import { ClickParam } from 'antd/lib/menu';

import { HIGH, NORMAL, LOW } from '../constants';
import { PriorityIcon } from '../../components/PriorityIcon';

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
    const menu = (
      <Menu onClick={this.onChange}>
        {Object.keys(PRIORITY_MENU).map(key => (
          <Menu.Item key={key}>{PRIORITY_MENU[key]}</Menu.Item>
        ))}
      </Menu>
    );

    return (
      <div style={this.style}>
        <Dropdown overlay={menu}>
          <Button>
            {this.state.value} <Icon type="down" />
          </Button>
        </Dropdown>
        <PriorityIcon icon={this.state.icon} />
      </div>
    );
  }

  private onChange = (click: ClickParam) => {
    this.setState({ value: PRIORITY_MENU[click.key as string], icon: click.key as string });
    this.props.onChangePriority(click.key as string);
  };
}
