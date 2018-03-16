import * as firebase from 'firebase';

import { getDatabase } from './getDatabase';
import { todoModel } from './models';

const database = getDatabase();

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
