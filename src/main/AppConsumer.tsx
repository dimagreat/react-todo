import * as React from 'react';
import * as firebase from 'firebase';

import { App } from './App';
import { UserConsumer, UserContextState } from '../user';

interface Props {
  changeRoute: (route: string) => void;
  user: firebase.UserInfo;
}

export class AppConsumer extends React.PureComponent<Props> {
  public render() {
    return (
      <UserConsumer>
        {(context: UserContextState) => (
          <App changeRoute={this.props.changeRoute} user={context.user!} />
        )}
      </UserConsumer>
    );
  }
}
