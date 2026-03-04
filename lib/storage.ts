import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadImage(file: File): Promise<string> {
    const storageRef = ref(storage, `packages/${Date.now()}_${file.name}`)
    await uploadBytes(storageRef, file)
    return await getDownloadURL(storageRef)
}