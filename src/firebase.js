
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA7kw2neY8rE0jlUb0NqHDy1MzrZCWBiKE",
  authDomain: "bulid-burgur.firebaseapp.com",
  projectId: "bulid-burgur",
  storageBucket: "bulid-burgur.appspot.com",
  messagingSenderId: "503724275350",
  appId: "1:503724275350:web:79a5b8b05b9bffc72db4b7",
  measurementId: "G-TKY6K7XGLH"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

 export {app, auth, db};
