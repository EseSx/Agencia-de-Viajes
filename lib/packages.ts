import { db } from "./firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export async function getPackages() {
    const snap = await getDocs(collection(db, "packages"))
    return snap.docs.map(d => ({id: d.id, ...d.data()}))
}

export async function createPackage(data: object) {
    return addDoc(collection(db, "packages"), data)
}

export async function updatePackage(id: string, data: object) {
    return updateDoc(doc(db, "packages", id), data)
}

export async function deletePackage(id: string) {
    return deleteDoc(doc(db, "packages", id))

}