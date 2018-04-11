import * as React from 'react';
import { Icon } from 'antd';

import { HIGH, NORMAL, LOW } from '../todo-list/constants';

interface Props {
  icon: string;
}

const PRIORITY_ICONS = {
  [HIGH]: 'up-circle',
  [NORMAL]: 'right-circle',
  [LOW]: 'down-circle',
};

export function PriorityIcon(props: Props) {
  console.log(props.icon);
  return <Icon type={PRIORITY_ICONS[props.icon]} />;
}
