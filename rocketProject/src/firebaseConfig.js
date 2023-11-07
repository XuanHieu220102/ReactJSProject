// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjn_bkhs47fxY9SJhKsuJ_PO9NIw6AWRc",
  authDomain: "vtirocketapi.firebaseapp.com",
  projectId: "vtirocketapi",
  storageBucket: "vtirocketapi.appspot.com",
  messagingSenderId: "593081861953",
  appId: "1:593081861953:web:56e603f6f9e0c5c77083c0",
  measurementId: "G-4W461WK4HW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const database = getAuth(app);

//set up google
export const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const auth = getAuth();
auth.languageCode = 'it';
// To apply the default browser preference instead of explicitly setting it.
// auth.useDeviceLanguage();
provider.setCustomParameters({
  'login_hint': 'xuanhieu0031@gmail.com'
});

