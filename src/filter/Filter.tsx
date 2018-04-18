import * as React from 'react';
import { Form, Switch, Collapse } from 'antd';

import './Filter.css';
import { DropdownMenu } from '../components';
import { PRIORITY_MENU, STATUS_MENU, ALL, NOT_COMPLETED } from '../shared/constants';

const Panel = Collapse.Panel;
const FormItem = Form.Item;

export interface FilterOptions {
  [key: string]: string | boolean;
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

  public componentDidMount() {
    this.props.onUpdate(this.state);
  }

  public render() {
    return (
      <Collapse className="filter">
        <Panel header="Filter" key="1">
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

  private onChangeStatusFilter = (value: string) => this.onChangeFilter('status', value);

  private onChangePriorityFilter = (value: string) => this.onChangeFilter('priority', value);

  private onChangeDescriptionFilter = (checked: boolean) =>
    this.onChangeFilter('withDescription', checked);

  private onChangeFilter = (
    key: string,
    value: string | boolean
  ) => {
    this.setState({ [key]: value }, () => this.props.onUpdate(this.state));
  };
}
