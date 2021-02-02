import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDYzRjQTNrMX2h3qUwdwlwYXLf3K8C9Q9k",
    authDomain: "picture-app-1cbee.firebaseapp.com",
    projectId: "picture-app-1cbee",
    storageBucket: "picture-app-1cbee.appspot.com",
    messagingSenderId: "1041089384827",
    appId: "1:1041089384827:web:619571e41dbb404d182dde"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();



export { db, auth, storage, provider };