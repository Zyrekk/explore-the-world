import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../FirebaseConfig";
import {doc, getDoc} from "firebase/firestore";
import { LocalStorageUserSchema} from "../interfaces/interfaces";
import { setUserDataToStorage } from "./AuthContext";
export const singIn = async (email: string, password: string) => {
    const auth = FIREBASE_AUTH;
    try {
        const response = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const userDocRef = doc(FIREBASE_DB, "Users", response.user.uid);
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            if (userData) {
                const userToStorage: LocalStorageUserSchema = {
                    uid: response.user.uid,
                    email: userData?.email,
                    nickname: userData?.nickname,
                    name: userData?.name,
                    lastname: userData?.lastname,
                    avatar: userData?.avatar,
                    country: userData?.country,
                };
                await Promise.all([
                    setUserDataToStorage(userToStorage)
                ]);
                alert("Sign in successful");
            } else {
                alert("User email not found");
            }
        } else {
            alert("User data not found in Firestore");
        }
    } catch (error) {
        console.error(error);
        alert("Sign in failed");
    }
};
