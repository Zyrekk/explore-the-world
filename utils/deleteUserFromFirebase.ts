import {FIREBASE_AUTH, FIREBASE_DB} from "@/FirebaseConfig";
import {deleteUser} from "firebase/auth";
import {deleteDoc, doc} from "@firebase/firestore";

export const deleteUserFromFirebase = async () => {
    const current = FIREBASE_AUTH.currentUser
    if (current) {
        const userDocRef = doc(FIREBASE_DB, "Users", current.uid);
        await deleteDoc(userDocRef)
        await deleteUser(current)
    }
}
