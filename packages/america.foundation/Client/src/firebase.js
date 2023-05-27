import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTMQxURYbC1ysyhopVBY3frrqUgm9xmPY",
  authDomain: "america-foundation.firebaseapp.com",
  projectId: "america-foundation",
  storageBucket: "america-foundation.appspot.com",
  messagingSenderId: "845364669103",
  appId: "1:845364669103:web:ff77e0e047c3175fb7025a",
  measurementId: "G-ZPYPGXCYBB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore();
export const functions = getFunctions(app);
