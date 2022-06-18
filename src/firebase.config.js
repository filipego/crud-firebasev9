import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
const API_KEY = process.env.NEXT_PUBLIC_API_KEY


const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "crud-firebase-learning.firebaseapp.com",
    projectId: "crud-firebase-learning",
    storageBucket: "crud-firebase-learning.appspot.com",
    messagingSenderId: "218513124382",
    appId: "1:218513124382:web:8c1099207e2ca41f6c120f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);