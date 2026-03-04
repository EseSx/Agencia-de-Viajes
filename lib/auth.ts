import {auth} from "@/lib/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth"

export async function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
}

export async function signIn(email: string, password: string) { 
    return signInWithEmailAndPassword(auth, email, password)
}

export async function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider())  
}

export async function signOut() {
    return firebaseSignOut(auth)
}
