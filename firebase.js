import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJFJ3G5W8BannC_BtPRXejSBZsX1FfQuM",
  authDomain: "scpbank-d1ca2.firebaseapp.com",
  projectId: "scpbank-d1ca2",
  storageBucket: "scpbank-d1ca2.firebasestorage.app",
  messagingSenderId: "797567952659",
  appId: "1:797567952659:web:c1cc8a18ecd6f019d3dce6",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

export { GoogleAuthProvider, signInWithCredential }
