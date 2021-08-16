import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCwoxlLKxVB-Sux2veWT5r95_ST19AbUZ4",
  authDomain: "bakmazon.firebaseapp.com",
  projectId: "bakmazon",
  storageBucket: "bakmazon.appspot.com",
  messagingSenderId: "300833813994",
  appId: "1:300833813994:web:fa2b64dc997fb6ece72e93",
  measurementId: "G-K9RKNPYS9T",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
