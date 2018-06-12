import * as React from 'react';
import { Button } from 'antd';
import * as firebase from 'firebase';

import './Login.css';

import { firebaseAuth } from '../firebase';

import { MAIN_ROUTE } from '../router';

interface Props {
  changeRoute: (route: string) => void;
  changeUser: (user: firebase.UserInfo) => void;
}

export class Login extends React.PureComponent<Props> {
  public render() {
    return (
      <div className="Login">
        <h1>Log In</h1>
        <div className="Login-google">
          <h3>Login with Google</h3>
          <Button size="large" shape="circle" icon="google" onClick={this.signInWithGoogle} />
        </div>
      </div>
    );
  }

  public componentDidMount() {
    firebaseAuth.onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.props.changeUser(user);
        this.props.changeRoute(MAIN_ROUTE);
      }
    });
  }

  private signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebaseAuth.signInWithPopup(provider);
  };
}
