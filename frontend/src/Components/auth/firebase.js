// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEk9gkvS7OUTu_gex_mbgKx2OK2c-rVvQ",
  authDomain: "quora-clone-mern-96e3e.firebaseapp.com",
  projectId: "quora-clone-mern-96e3e",
  storageBucket: "quora-clone-mern-96e3e.appspot.com",
  messagingSenderId: "472949594439",
  appId: "1:472949594439:web:95b172acfef80937f15462",
  measurementId: "G-YTY9HXWDKM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();
const provider= new GoogleAuthProvider();
export {auth,provider};