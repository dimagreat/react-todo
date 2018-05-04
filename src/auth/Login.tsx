import * as React from 'react';
import { Button } from 'antd';
import * as firebase from 'firebase';

import './Login.css';

import { firebaseAuth } from '../firebase';

interface State {
  user: firebase.User | null;
}

export class Login extends React.PureComponent<{}, State> {
  public state = {
    user: null,
  };

  public render() {
    return (
      <div className="Login">
        <Button className="Login-google" size="large" onClick={this.signIn}>
          Google Sign
        </Button>
      </div>
    );
  }

  public componentDidMount() {
    firebaseAuth.onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.setState({ user });
        // TODO: Redirect
      } else {
        // TODO: Redirect Login
      }
    });
  }

  private signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebaseAuth.signInWithPopup(provider);
  };
}
