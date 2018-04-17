import { TodoEntity } from '../shared/constants';
import { firebaseDb } from './index';

const TODOS_PATH = '/todos';
const CATEGORY_PATH = '/categories';

export function getActiveTodos() {
  return firebaseDb.ref(`${TODOS_PATH}`).once('value');
}

interface Todo {
  title: string;
  priority: string;
}

export function addTodoItem(todo: Todo) {
  return firebaseDb.ref(`${TODOS_PATH}`).push({ ...todo, isCompleted: false });
}

export function updateTodoItem(key: string, value: TodoEntity) {
  return firebaseDb.ref(`${TODOS_PATH}/${key}`).update(value);
}

export function removeTodoItem(key: string) {
  return firebaseDb.ref(`${TODOS_PATH}/${key}`).remove();
}

export function getCategories() {
  return firebaseDb.ref(`${CATEGORY_PATH}`).once('value');
}

export function updateCategories(categories: string[]) {
  return firebaseDb.ref(`${CATEGORY_PATH}`).set(categories);
}
