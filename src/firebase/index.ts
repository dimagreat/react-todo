import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

import { firebaseConfig } from './config';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDb = firebase.database();
export const firebaseAuth = firebase.auth();
