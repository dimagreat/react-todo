import * as firebase from 'firebase';

let database;

function getDatabase() {
  if (database) {
    return database;
  }
  const projectId = process.env.REACT_APP_FIREBASE_PROJECT;
  const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: `${projectId}.firebaseapp.com`,
    databaseURL: `https://${projectId}.firebaseio.com`,
    projectId,
    storageBucket: `${projectId}.appspot.com`,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE,
  };

  firebase.initializeApp(config);

  database = firebase.database();
  return database;
}

export { getDatabase };
