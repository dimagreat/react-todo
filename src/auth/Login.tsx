import * as React from 'react';
import { Button, Input, Icon } from 'antd';
import * as firebase from 'firebase';

import './Login.css';

import { App } from '../main';

import { firebaseAuth } from '../firebase';

interface State {
  user: firebase.User | null;
  login: {
    email: string;
    password: string;
  };
}

export class Login extends React.PureComponent<{}, State> {
  public state = {
    user: null,
    login: {
      email: '',
      password: '',
    },
  };

  public render() {
    const { user } = this.state;

    if (user) {
      return <App user={user} />;
    }

    return (
      <div className="Login">
        <h1>Log In</h1>
        <div className="Login-auth">
          <Input
            className="Login-input"
            size="large"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Enter email"
          />
          <Input
            className="Login-input"
            size="large"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Enter password"
          />
          <Button
            type="primary"
            className="Login-google"
            size="large"
            onClick={this.signUpWithEmail}
          >
            Sign In
          </Button>
        </div>

        <div className="Login-others">
          <Button size="large" onClick={this.signInWithGoogle}>
            Google
          </Button>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    firebaseAuth.onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  private signUpWithEmail = () => {
    const { login: { email, password } } = this.state;
    firebaseAuth.createUserWithEmailAndPassword(email, password).catch(error => {
      if (error.code) {
        firebaseAuth.signInWithEmailAndPassword(email, password);
      }
    });
  };

  private signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebaseAuth.signInWithPopup(provider);
  };
}
