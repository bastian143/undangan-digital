import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForDevelopmentBuild1234567",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "undangan-digital.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "undangan-digital-dev",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "undangan-digital-dev.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789012:web:abcdef1234567890",
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
} catch (e) {
  console.warn("Firebase app init warning:", e);
  app = {} as FirebaseApp;
}

try {
  auth = getAuth(app);
} catch (e) {
  // Graceful fallback during static build / prerender if API key is not yet connected
  auth = {} as Auth;
}

try {
  db = getFirestore(app);
} catch (e) {
  db = {} as Firestore;
}

try {
  storage = getStorage(app);
} catch (e) {
  storage = {} as FirebaseStorage;
}

export { auth, db, storage };
export default app;
