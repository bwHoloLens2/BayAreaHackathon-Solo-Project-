import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDSdM9XReUhSgNfh_4mGCvW6FABHq6LDas",
  authDomain: "ainotetaking.firebaseapp.com",
  projectId: "ainotetaking",
  storageBucket: "ainotetaking.appspot.com",
  messagingSenderId: "729530545848",
  appId: "1:729530545848:web:8da7443f589199a900a64d",
  measurementId: "G-QKJXT4CZWZ"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
getFirestore(app);
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export {
  auth as a
};
