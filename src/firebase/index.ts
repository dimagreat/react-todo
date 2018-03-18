import * as firebase from 'firebase';
import 'firebase/database';

import { firebaseConfig } from './config';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDb = firebase.database();
