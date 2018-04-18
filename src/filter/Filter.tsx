import * as React from 'react';
import { Form, Switch, Collapse } from 'antd';

import { DropdownMenu } from '../components';
import { PRIORITY_MENU, STATUS_MENU, ALL, NOT_COMPLETED } from '../shared/constants';

const Panel = Collapse.Panel;
const FormItem = Form.Item;

enum Options {
  status,
  priority,
  withDescription,
}

export interface FilterOptions {
  status: string;
  priority: string;
  withDescription: boolean;
}

interface Props {
  onUpdate: (filter: FilterOptions) => void;
}

export class Filter extends React.PureComponent<Props, FilterOptions> {
  public state = {
    status: NOT_COMPLETED,
    priority: '',
    withDescription: false,
  };
  private style = {
    width: 300,
    margin: 'auto',
  };

  public render() {
    return (
      <Collapse style={this.style}>
        <Panel header="Filter todos" key="1">
          <FormItem label="Status">
            <DropdownMenu
              values={STATUS_MENU}
              default={STATUS_MENU[NOT_COMPLETED]}
              onChange={this.onChangeStatusFilter}
            />
          </FormItem>
          <FormItem label="Priority">
            <DropdownMenu
              values={PRIORITY_MENU}
              default={PRIORITY_MENU[ALL]}
              onChange={this.onChangePriorityFilter}
            />
          </FormItem>
          <FormItem label="Description">
            <Switch onChange={this.onChangeDescriptionFilter}>Show Items with description</Switch>
          </FormItem>
        </Panel>
      </Collapse>
    );
  }

  private onChangeStatusFilter = (value: string) => this.onChangeFilter(Options.status, value);

  private onChangePriorityFilter = (value: string) => this.onChangeFilter(Options.priority, value);

  private onChangeDescriptionFilter = (checked: boolean) =>
    this.onChangeFilter(Options.withDescription, checked);

  private onChangeFilter = (key: Options, value: string | boolean) => {
    this.setState({ [key]: value }, () => this.props.onUpdate(this.state));
  };
}
