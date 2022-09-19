import { goto } from '$app/navigation';
import {
	PUBLIC_API_KEY,
	PUBLIC_AUTH_DOMAIN,
	PUBLIC_PROJECT_ID,
	PUBLIC_STORAGE_BUCKET,
	PUBLIC_MESSAGING_SENDER_ID,
	PUBLIC_APP_ID,
	PUBLIC_MEASUREMENT_ID
} from '$env/static/public';
import { initializeApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import {
	browserLocalPersistence,
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	setPersistence,
	signInWithPopup,
	type Auth
} from 'firebase/auth';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { currentUser, isLoggedIn } from '$lib/stores/authStore';

let app: FirebaseApp;
let auth: Auth;
let provider: GoogleAuthProvider;
export let storage: FirebaseStorage;
const firebaseConfig: FirebaseOptions = {
	apiKey: PUBLIC_API_KEY,
	authDomain: PUBLIC_AUTH_DOMAIN,
	projectId: PUBLIC_PROJECT_ID,
	storageBucket: PUBLIC_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_MESSAGING_SENDER_ID,
	appId: PUBLIC_APP_ID,
	measurementId: PUBLIC_MEASUREMENT_ID
};

export function initFirebase() {
	app = initializeApp(firebaseConfig);
	auth = getAuth(app);
	storage = getStorage(app);
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

initFirebase();
