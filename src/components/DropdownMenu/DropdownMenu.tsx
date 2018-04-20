import * as React from 'react';
import { Button, Dropdown, Icon, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';

import './DropdownMenu.css';

interface Props {
  onChange: (value: string) => void;
  values: {
    [key: string]: string;
  };
  default?: string;
}

interface State {
  value: string;
}

export class DropdownMenu extends React.PureComponent<Props, State> {
  public state: State = {
    value: this.props.default ? this.props.default : '',
  };

  public componentWillUpdate(nextProps: Props) {
    if (nextProps.default && nextProps.default !== this.props.default) {
      this.setState({ value: nextProps.default });
    }
  }

  public render(): JSX.Element {
    const { values } = this.props;
    const { value } = this.state;

    const menu = (
      <Menu onClick={this.onChange}>
        {Object.keys(values).map(key => <Menu.Item key={key}>{values[key]}</Menu.Item>)}
      </Menu>
    );

    return (
      <Dropdown overlay={menu}>
        <Button className="DropdownMenu">
          {value} <Icon type="down" />
        </Button>
      </Dropdown>
    );
  }

  private onChange = (click: ClickParam) => {
    this.setState({ value: this.props.values[click.key as string] });
    this.props.onChange(click.key as string);
  };
}
