import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../FirebaseConfig";
import { FirebaseUserSchema } from "../interfaces/interfaces";
import { doc, setDoc,addDoc } from "firebase/firestore";
import { setUserDataToStorage } from "./AuthContext";

export const signUp = async (
    email: string,
    password: string,
    nickname: string,
    repeatPassword: string
) => {
    const auth = FIREBASE_AUTH;
    if (password !== repeatPassword) {
        alert("Passwords don't match");
        return;
    }
    try {
        const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        if (response) {
            const registerData: FirebaseUserSchema = {
                email: email || "",
                nickname,
            };

            await Promise.all([
                setDoc(
                    doc(FIREBASE_DB, "Users", response.user.uid),
                    registerData
                ),
                setUserDataToStorage({
                    uid: response.user.uid,
                    email,
                    nickname,
                    name: "",
                    lastname: "",
                    avatar: "",
                }),
            ]);
            alert("Sign up successful");
        }
    } catch (error) {
        console.error(error);
        alert("Sign up failed");
    }
};
