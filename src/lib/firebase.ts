import { goto } from '$app/navigation';
import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  type Auth
} from 'firebase/auth';
import { currentUser, isLoggedIn } from './stores/authStore';

let app: FirebaseApp;
let auth: Auth;
let provider: GoogleAuthProvider;
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

export function initFirebase() {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
  isLoggedIn.set(auth.currentUser !== null);
  setPersistence(auth, browserLocalPersistence);

  onAuthStateChanged(auth, (user) => {
    isLoggedIn.set(user !== null);
    currentUser.set(user);
  });
}

export function signIn() {
  signInWithPopup(auth, provider)
    .then(() => {
      goto('/profile');
    })
    .catch((error) => {
      console.error(error);
    });
}

export function signOut() {
  auth.signOut();
  goto('/');
}
