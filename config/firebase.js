// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "expense-tracker-e5d06.firebaseapp.com",
  projectId: "expense-tracker-e5d06",
  storageBucket: "expense-tracker-e5d06.appspot.com",
  messagingSenderId: "841540653510",
  appId: "1:841540653510:web:4a7fafaa128647256522c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)