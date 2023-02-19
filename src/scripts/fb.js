import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth, setPersistence, browserLocalPersistence} from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDSdM9XReUhSgNfh_4mGCvW6FABHq6LDas",
    authDomain: "ainotetaking.firebaseapp.com",
    projectId: "ainotetaking",
    storageBucket: "ainotetaking.appspot.com",
    messagingSenderId: "729530545848",
    appId: "1:729530545848:web:8da7443f589199a900a64d",
    measurementId: "G-QKJXT4CZWZ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
export const db = getFirestore(app);
firebase.initializeApp(firebaseConfig);
export const cdb = firebase.firestore();
// export const realtimedb = firebase.database("https://aiedu-d1e5f-default-rtdb.firebaseio.com/");