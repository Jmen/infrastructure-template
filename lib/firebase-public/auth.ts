import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged, getIdToken, getAuth,
  NextOrObserver,
  User,
  Auth,
} from "firebase/auth";

import { auth } from "@/lib/firebase-public/clientApp";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/lib/firebase-public/config";
import { getInstallations, getToken } from "firebase/installations";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}

export async function getAuthHeaders() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const installations = getInstallations(app);
  const headers = new Headers();
  const [authIdToken, installationToken] = await Promise.all([
    getAuthIdToken(auth),
    getToken(installations),
  ]);
  headers.append("Firebase-Instance-ID-Token", installationToken);
  if (authIdToken) headers.append("Authorization", `Bearer ${authIdToken}`);
  return headers;
}

async function getAuthIdToken(auth: Auth) {
  await auth.authStateReady();
  if (!auth.currentUser) return;
  return await getIdToken(auth.currentUser);
}