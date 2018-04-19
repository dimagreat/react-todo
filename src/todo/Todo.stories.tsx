import * as React from 'react';
import { storiesOf } from '@storybook/react';

import 'antd/dist/antd.css';
import { Todo } from './Todo';

const todo = {
  title: 'Cool Title',
  description: 'Description',
  id: '0',
  isCompleted: false,
  priority: 'NORMAL',
  categories: ['Test', 'Todo', 'Story']
};

function onComplete() {
  console.log('Completed');
}

storiesOf('Todo', module).add('Simple Todo', () => <Todo todo={todo} onComplete={onComplete} />);
