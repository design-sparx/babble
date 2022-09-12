// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA5B8NjdFSg6iS82dq7qI9X3Hk3KS_uWDI',
  authDomain: 'babbe-3cd8e.firebaseapp.com',
  projectId: 'babbe-3cd8e',
  storageBucket: 'babbe-3cd8e.appspot.com',
  messagingSenderId: '789458423733',
  appId: '1:789458423733:web:cb8043d1f22ce0dcee93fc'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
