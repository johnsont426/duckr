import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCtfRPpde2UrMOmgxiK_tExqG88fMqDz-g",
  authDomain: "duckr-4b4d8.firebaseapp.com",
  databaseURL: "https://duckr-4b4d8.firebaseio.com",
  projectId: "duckr-4b4d8",
  storageBucket: "duckr-4b4d8.appspot.com",
  messagingSenderId: "591181963832"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
