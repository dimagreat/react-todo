import { TodoEntity } from '../shared/constants';
import { firebaseDb } from './index';

const TODOS_PATH = '/todos';
const CATEGORY_PATH = '/categories';

interface Todo {
  title: string;
  priority: string;
}

class FirebaseApi {
  private UID = '';

  public setUid = (uid: string) => {
    this.UID = `/${uid}`;
  };

  public getActiveTodos() {
    return firebaseDb.ref(`${TODOS_PATH}${this.UID}`).once('value');
  }

  public addTodoItem(todo: Todo) {
    return firebaseDb.ref(`${TODOS_PATH}${this.UID}`).push({ ...todo, isCompleted: false });
  }

  public updateTodoItem(key: string, value: TodoEntity) {
    return firebaseDb.ref(`${TODOS_PATH}${this.UID}/${key}`).update(value);
  }

  public removeTodoItem(key: string) {
    return firebaseDb.ref(`${TODOS_PATH}${this.UID}/${key}`).remove();
  }

  public getCategories() {
    return firebaseDb.ref(`${CATEGORY_PATH}${this.UID}`).once('value');
  }

  public updateCategories(categories: string[]) {
    return firebaseDb.ref(`${CATEGORY_PATH}${this.UID}`).set(categories);
  }
}

export const firebaseApi = new FirebaseApi();
