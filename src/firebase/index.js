import * as firebase from 'firebase';

import { todoModel } from './models';

let database;

export function firebaseInit() {
  const projectId = process.env.REACT_APP_FIREBASE_PROJECT;
  const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: `${projectId}.firebaseapp.com`,
    databaseURL: `https://${projectId}.firebaseio.com`,
    projectId,
    storageBucket: `${projectId}.appspot.com`,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE,
  };

  firebase.initializeApp(config);

  database = firebase.database();
}

export function getTodoDB() {
  return database.ref(`/`).once('value');
}

export function addTodoItem(name: string) {
  return new Promise((resolve, reject) => {
    database
      .ref(`/`)
      .once('value')
      .then(todo => {
        let todos = todo.val().todos || [];
        let key = database.ref(`/`).push().key;
        todos.push(todoModel(key, name, firebase.database.ServerValue.TIMESTAMP));
        database
          .ref(`/todos`)
          .set(todos)
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
  });
}
