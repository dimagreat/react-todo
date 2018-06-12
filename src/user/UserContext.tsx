import * as React from 'react';
import * as firebase from 'firebase';

const UserContext = React.createContext({});

interface State {
  user: firebase.UserInfo | null;
}

export const UserConsumer = UserContext.Consumer;

export interface UserContextState {
  user: firebase.UserInfo | null;
  changeUser(user: firebase.UserInfo): void;
}

export class UserProvider extends React.Component<{}, State> {
  public state = {
    user: null,
  };

  public render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          changeUser: this.changeUser,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }

  private changeUser = (user: firebase.UserInfo) => {
    this.setState({ user });
  };
}
