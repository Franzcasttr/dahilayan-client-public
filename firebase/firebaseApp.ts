// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBHGyX4BvDwlivZ54jBQTehI03c9uj-YJk',
  authDomain: 'dahilayan-auth.firebaseapp.com',
  projectId: 'dahilayan-auth',
  storageBucket: 'dahilayan-auth.appspot.com',
  messagingSenderId: '989648927769',
  appId: '1:989648927769:web:43ebead5c664bea07dfe88',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
  return app;
};
