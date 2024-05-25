// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC29uhC8qt0MZt9-5N7YHmv4_DSD1Ngs8E",
  authDomain: "video-streaming-899.firebaseapp.com",
  projectId: "video-streaming-899",
  appId: "1:847055453152:web:f35129119b64aca4cf8985",
  measurementId: "G-GVMJCC9LVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// export { auth, provider };
// export default app;

export function signInWithGoogle() {
  return signInWithPopup(auth, provider);
}

export function signOut(){
    return auth.signOut();
}

export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}