import {FIREBASE_AUTH, FIREBASE_DB} from "@/FirebaseConfig";
import {createUserWithEmailAndPassword,sendEmailVerification} from "firebase/auth";
import {doc, getDoc, setDoc} from "@firebase/firestore";
import {UserInterface} from "@/constants/UserInterface";
import {saveUserToStorage} from "@/utils/saveUserToStorage";

export const signUp = async (
    email: string,
    password: string,
    confirmPassword: string,
    nickname: string,
    setLoading: (loading: boolean) => void,
    router: any
) => {
    const auth = FIREBASE_AUTH;
    if (password !== confirmPassword) {
        alert("Passwords don't match");
        return;
    }
    setLoading(true);
    try {
        const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        if (response){
            const registerData= {
                email: email,
                nickname,
            };

            await setDoc(
                doc(FIREBASE_DB, "Users", response.user.uid),
                registerData
            );

            await sendEmailVerification(response.user)
        }
        alert("Sign up successful, check your email to verify account");
        router.replace("/login");
    } catch (error) {
        alert("Sign up failed");
    } finally {
        setLoading(false);
    }
};
