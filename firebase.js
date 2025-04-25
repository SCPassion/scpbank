import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth"

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
} from "firebase/firestore"

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

const db = getFirestore(app)

// Create a new user in Firestore
export async function createUser(userId) {
  console.log("Creating user with ID: ", userId)
  try {
    const userRef = doc(db, "users", userId)
    const userSnapshot = await getDoc(userRef)
    if (userSnapshot.exists()) {
      console.log("User already exists")
      return
    }
    await setDoc(userRef, { createdAt: new Date() })
    console.log("User created successfully")
  } catch (error) {
    console.error("Error creating user: ", error)
  }
}

// Create a new vault for a user in Firestore
export async function createVault(
  userId,
  { goalName, targetAmount, durationInWeeks },
) {
  try {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, {
      [goalName]: {
        targetAmount,
        durationInWeeks,
      },
    })

    return "Vault created successfully"
  } catch (error) {
    console.error("Error creating vault: ", error)
    return error
  }
}

export async function deleteVault(userId, goalName) {
  try {
    const subcollectionRef = doc(db, "users", userId)
    await updateDoc(subcollectionRef, {
      [goalName]: deleteField(),
    })
    console.log("Vault deleted successfully")
  } catch (error) {
    console.error("Error deleting vault: ", error)
  }
}

export { GoogleAuthProvider, signInWithCredential }
