import * as React from 'react';

import { Login } from './Login';
import { UserConsumer, UserContextState } from '../user';

interface Props {
  changeRoute: (route: string) => void;
  changeUser: (user: firebase.UserInfo) => void;
}

export class LoginConsumer extends React.PureComponent<Props> {
  public render() {
    return (
      <UserConsumer>
        {(context: UserContextState) => (
          <Login changeRoute={this.props.changeRoute} changeUser={context.changeUser} />
        )}
      </UserConsumer>
    );
  }
}
