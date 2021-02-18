import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBdK6Z0FeSDqlLwsdpaHcO4GOLjq2gIiu0",
    authDomain: "crud-b379d.firebaseapp.com",
    projectId: "crud-b379d",
    storageBucket: "crud-b379d.appspot.com",
    messagingSenderId: "941861749511",
    appId: "1:941861749511:web:12c4bbecd167a24e6c7ba2"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig)
  