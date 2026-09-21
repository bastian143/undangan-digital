import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./config";
import { COLLECTIONS } from "@/lib/constants";
import { User } from "@/types";

const googleProvider = new GoogleAuthProvider();

// ---- Sign Up with Email/Password ----
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<FirebaseUser> {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const user = credential.user;

  // Update display name
  await updateProfile(user, { displayName });

  // Create user document in Firestore
  await createUserDocument(user, displayName);

  return user;
}

// ---- Sign In with Email/Password ----
export async function signInWithEmail(
  email: string,
  password: string
): Promise<FirebaseUser> {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

// ---- Sign In with Google ----
export async function signInWithGoogle(): Promise<FirebaseUser> {
  const credential = await signInWithPopup(auth, googleProvider);
  const user = credential.user;

  // Check if user document exists, create if not
  const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, user.uid));
  if (!userDoc.exists()) {
    await createUserDocument(user, user.displayName || "");
  }

  return user;
}

// ---- Sign Out ----
export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

// ---- Create User Document ----
async function createUserDocument(
  user: FirebaseUser,
  displayName: string
): Promise<void> {
  const userRef = doc(db, COLLECTIONS.USERS, user.uid);
  await setDoc(userRef, {
    email: user.email,
    displayName: displayName || user.displayName || "",
    photoURL: user.photoURL || "",
    role: "user",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

// ---- Get User Data from Firestore ----
export async function getUserData(uid: string): Promise<User | null> {
  const userRef = doc(db, COLLECTIONS.USERS, uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) return null;

  return { id: userDoc.id, ...userDoc.data() } as User;
}

// ---- Check if User is Admin ----
export async function isAdmin(uid: string): Promise<boolean> {
  const userData = await getUserData(uid);
  return userData?.role === "admin";
}

// ---- Auth State Observer ----
export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
  try {
    if (!auth || typeof window === "undefined") {
      callback(null);
      return () => {};
    }
    return onAuthStateChanged(auth, callback);
  } catch (e) {
    callback(null);
    return () => {};
  }
}
