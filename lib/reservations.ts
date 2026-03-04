import { db } from "./firebase";
import { collection, addDoc, getDocs, query, where, serverTimestamp} from "firebase/firestore";

type ReservationStatus = "pending" | "confirmed"

export async function createReservation(userId: string, packageId: string, seats: number) {
    return addDoc(collection(db, "reservations"), {
        userId,
        packageId,
        seats,
        status: "pending" as ReservationStatus,
        createdAt: serverTimestamp()
    })
}

export async function getUserReservations(userId: string) {
    const q = query(collection(db, "reservations"), where("userId", "==", userId))
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}