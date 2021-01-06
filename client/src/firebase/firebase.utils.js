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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });

        } catch (error) {
            console.log(error);
        }
    }

    return userRef;
}

export const createUserCartDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const cartRef = firestore.doc(`carts/${userAuth.uid}`);
    const snapShot = await cartRef.get();
    if (!snapShot.exists) {
        try {
            await cartRef.set({
                cartItems: [],
                ...additionalData
            });

        } catch (error) {
            console.log(error);
        }
    }

    return cartRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
}

export const converCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return { 
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title, 
            items
        };
    });

    return transformedCollection.reduce((acc, collection) => {
        acc[collection.title.toLowerCase()] = collection;
        return acc;
    }, {});
}

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
}

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);