const projectId = process.env.REACT_APP_FIREBASE_PROJECT || '';
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE,
  projectId,
  storageBucket: `${projectId}.appspot.com`,
};
