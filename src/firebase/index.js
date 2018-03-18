// @flow
import firebase from 'firebase/app';
import 'firebase/database';
import type { FirebaseApp, FirebaseDatabase } from 'firebase';

import { firebaseConfig } from './config';

export const firebaseApp: FirebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDb: FirebaseDatabase = firebase.database();
