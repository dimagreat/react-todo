import { TodoEntity } from '../todo-list/constants';
import { firebaseDb } from './index';

const path = '/todos';

export function getActiveTodos() {
  return firebaseDb.ref(`${path}`).once('value');
}

interface Todo {
  title: string;
  priority: string;
}

export function addTodoItem(todo: Todo) {
  return firebaseDb.ref(`${path}`).push({ ...todo, isCompleted: false });
}

export function updateTodoItem(key: string, value: TodoEntity) {
  return firebaseDb.ref(`${path}/${key}`).update(value);
}

export function removeTodoItem(key: string) {
  return firebaseDb.ref(`${path}/${key}`).remove();
}
