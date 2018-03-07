// @flow
import React from 'react';

type Props = {
  name: string,
};

export function Task(props: Props) {
  return <div>{props.name}</div>;
}
