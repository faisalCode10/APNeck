// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyxtiYrpQl9A4G95iy7KBQom53qLHvSYk",
  authDomain: "app-neck.firebaseapp.com",
  projectId: "app-neck",
  storageBucket: "app-neck.appspot.com",
  messagingSenderId: "816005122598",
  appId: "1:816005122598:web:7beda8207875dfca3134e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app)
const auth = getAuth(app)

export {fireDB, auth}