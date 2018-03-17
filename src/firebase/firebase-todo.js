import { firebaseDb } from './index';

const path = '/todos';

export function getActiveTodos() {
  return firebaseDb.ref(`${path}`).once('value');
}

export function addTodoItem(name) {
  return firebaseDb.ref(`${path}`).push({ name, isCompleted: false });
}

export function updateTodoItem(key, value) {
  return firebaseDb.ref(`${path}/${key}`).update(value);
}

export function removeTodoItem(key) {
  return firebaseDb.ref(`${path}/${key}`).remove();
}
