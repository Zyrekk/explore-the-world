import {FIREBASE_AUTH, FIREBASE_DB} from "@/FirebaseConfig";
import {signInWithEmailAndPassword} from "firebase/auth";
import {doc, getDoc} from "@firebase/firestore";

export const deleteConfirm = async (
    email: string,
    password: string,
) => {
    try {
        const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
        const userDocRef = doc(FIREBASE_DB, "Users", response.user.uid);
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
            return  true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
};