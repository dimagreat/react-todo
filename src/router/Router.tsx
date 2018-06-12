import * as React from 'react';

import { Login } from '../auth';
import { App } from '../main';
import { UserProvider } from '../user';

import { LOGIN_ROUTE, MAIN_ROUTE } from './constants';

interface State {
  currentRoute: string;
}

export class Router extends React.Component<{}, State> {
  public state = {
    currentRoute: LOGIN_ROUTE,
  };
  private routes = {
    [LOGIN_ROUTE]: Login,
    [MAIN_ROUTE]: App,
  };

  public render() {
    const Route = this.routes[this.state.currentRoute] || null;

    return (
      <UserProvider>
        <Route changeRoute={this.changeRoute} />
      </UserProvider>
    );
  }

  private changeRoute = (route: string) => {
    this.setState({ currentRoute: route });
  };
}
