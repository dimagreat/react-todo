import * as React from 'react';

import { Button, Dropdown, Icon, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';

import { ALL, COMPLETED, NOT_COMPLETED } from './constants';

interface Props {
  onChangeFilter: (value: string) => void;
}

interface State {
  value: string;
}

const FILTER_MENU = {
  [ALL]: 'All',
  [COMPLETED]: 'Completed',
  [NOT_COMPLETED]: 'Not Completed',
};

export class TodoFilter extends React.PureComponent<Props, State> {
  public state: State = {
    value: FILTER_MENU[ALL],
  };

  public render() {
    const menu = (
      <Menu onClick={this.onChange}>
        {Object.keys(FILTER_MENU).map(key => <Menu.Item key={key}>{FILTER_MENU[key]}</Menu.Item>)}
      </Menu>
    );

    const style = {
      marginLeft: '8px',
      width: '150px',
    };

    return (
      // TODO: Update to Select
      <Dropdown overlay={menu}>
        <Button style={style}>
          {this.state.value} <Icon type="down" />
        </Button>
      </Dropdown>
    );
  }

  private onChange = (click: ClickParam) => {
    this.setState({ value: FILTER_MENU[click.key as string] });
    this.props.onChangeFilter(click.key as string);
  };
}
