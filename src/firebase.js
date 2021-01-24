
import firebase from 'firebase';
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDAWcLVphUQ7wmAvO7dfMBE2uD3UTMQPqA",
    authDomain: "code-editor-93719.firebaseapp.com",
    projectId: "code-editor-93719",
    storageBucket: "code-editor-93719.appspot.com",
    messagingSenderId: "299366435019",
    appId: "1:299366435019:web:ca894ea9832939a796734e",
    measurementId: "G-0326X3K20V"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider, storage, firebaseApp};