import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../FirebaseConfig";
import { FirebaseUserSchema } from "../interfaces/interfaces";
import { doc, setDoc } from "firebase/firestore";
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
            const { email } = response.user;
            const userSchemaToPost: FirebaseUserSchema = {
                uid: response.user.uid,
                email: email || "",
                nickname,
            };

            await Promise.all([
                setDoc(
                    doc(FIREBASE_DB, "Users", response.user.uid),
                    userSchemaToPost
                ),
                setUserDataToStorage(userSchemaToPost),
            ]);

            alert("Check your emails!");
        }
    } catch (error) {
        console.error(error);
        alert("Sign up failed");
    }
};
