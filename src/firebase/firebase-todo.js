import { firebaseDb } from './index';

export function getActiveTodos() {
  return firebaseDb.ref(`/todos`).once('value');
}

export function addTodoItem(name) {
  return firebaseDb.ref(`/todos`).push({ name });
}

export function removeTodoItem(key) {
  return firebaseDb.ref(`/todos/${key}`).remove();
}
