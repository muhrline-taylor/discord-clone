import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAT7IY_02UxMHqJdfNnXjcfuqOwJbX8y7o",
    authDomain: "discord-clone-d23f1.firebaseapp.com",
    projectId: "discord-clone-d23f1",
    storageBucket: "discord-clone-d23f1.appspot.com",
    messagingSenderId: "985016732397",
    appId: "1:985016732397:web:b1651866ba14da5d649ae4",
    measurementId: "G-9TMBQ6T3YM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;