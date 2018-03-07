// @flow
import React from 'react';

type Props = {
  name: string,
};

export function Task(props: Props) {
  return <p>{props.name}</p>;
}
