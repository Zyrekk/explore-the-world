import {doc, updateDoc} from "firebase/firestore";
import {FIREBASE_DB} from "../../../FirebaseConfig";
import {LocalStorageUserSchema} from "../interfaces/interfaces";
import {setUserDataToStorage} from "./AuthContext";

export const updateUser = async (fetchedUser:LocalStorageUserSchema,object:any) => {
    if (fetchedUser) {
        try {
            await updateDoc(doc(FIREBASE_DB, `Users/${fetchedUser.uid}`), object);
            const newUser = {...fetchedUser, ...object};
            setUserDataToStorage(newUser)
            alert("User data updated successfully");
        } catch (error) {
            console.error(error);
            alert("User data update failed");
        }
    } else {
        alert("No user data to update");
    }
};
