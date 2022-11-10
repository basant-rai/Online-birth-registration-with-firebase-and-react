
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import{getAuth} from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyDF2LYurLLGYk-2WA4FJ-GdSVzXVIICqeo",

  authDomain: "birth-certificate-registration.firebaseapp.com",

  projectId: "birth-certificate-registration",

  storageBucket: "birth-certificate-registration.appspot.com",

  messagingSenderId: "853989498559",

  appId: "1:853989498559:web:c4b69b07ac9282f155b00a",

  measurementId: "G-EB5DZYNEB3"

};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
