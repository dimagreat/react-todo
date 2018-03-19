import { TodoEntity } from '../todo-list/constants';
import { firebaseDb } from './index';

const path = '/todos';

export function getActiveTodos() {
  return firebaseDb.ref(`${path}`).once('value');
}

export function addTodoItem(name: string) {
  return firebaseDb.ref(`${path}`).push({ name, isCompleted: false });
}

export function updateTodoItem(key: string, value: TodoEntity) {
  return firebaseDb.ref(`${path}/${key}`).update(value);
}

export function removeTodoItem(key: string) {
  return firebaseDb.ref(`${path}/${key}`).remove();
}
