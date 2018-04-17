import * as React from 'react';
import { Icon } from 'antd';

import { HIGH, NORMAL, LOW } from '../shared/constants';

interface Props {
  icon: string;
}

const PRIORITY_ICONS = {
  [HIGH]: {
    type: 'up-circle',
    color: 'red',
  },
  [NORMAL]: {
    type: 'right-circle',
    color: 'green',
  },
  [LOW]: {
    type: 'down-circle',
    color: 'grey',
  },
};

export function PriorityIcon(props: Props) {
  const { color, type } = PRIORITY_ICONS[props.icon];
  return <Icon style={{ color }} type={type} />;
}
