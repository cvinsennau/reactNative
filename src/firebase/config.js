import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC5Aez-40lovhxVMzisj-WrxqAhtSz2Fpg",
    authDomain: "rnfirebasestorage-a9412.firebaseapp.com",
    projectId: "rnfirebasestorage-a9412",
    storageBucket: "rnfirebasestorage-a9412.appspot.com",
    messagingSenderId: "164613259683",
    appId: "1:164613259683:web:2ba66795fcfde31a15da16",
}

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
