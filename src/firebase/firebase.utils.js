import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDwyeU9VoaZwF52YSZPxOau5b5wIaGPbhI",
    authDomain: "crwn-db-d567e.firebaseapp.com",
    projectId: "crwn-db-d567e",
    storageBucket: "crwn-db-d567e.appspot.com",
    messagingSenderId: "83055546884",
    appId: "1:83055546884:web:66880b896a4146213adb51"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);