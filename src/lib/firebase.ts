import firebase from "firebase/compat/app";
import { config } from "../config/index";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseUrl,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
  measurementId: config.firebase.measurementId,
};

// Initialize Firebase only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const auth = firebase.auth();

// Check if Firebase is connected
auth
  .signInAnonymously()
  .then(() => {
    console.log("Firebase connected");
  })
  .catch((error) => {
    console.error("Error connecting to Firebase:", error);
  });

export { firestore, firebaseConfig, firebase };
