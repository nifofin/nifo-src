import * as firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyARWEgQeRTOiiVz5oNuIopNIhFjMBgXm_Q",
  authDomain: "nifo-2d10e.firebaseapp.com",
  databaseURL: "https://nifo-2d10e.firebaseio.com",
  projectId: "nifo-2d10e",
  storageBucket: "nifo-2d10e.appspot.com",
  messagingSenderId: "79502349192",
  appId: "1:79502349192:web:b73e41f9e9ec283067a03d",
  measurementId: "G-30W5V204XC"
};

const db = firebase.initializeApp(firebaseConfig).firestore();

export { firebase , db };

// some reference: https://firebase.google.com/docs/firestore/quickstart
