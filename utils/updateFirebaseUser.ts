import {UserInterface} from "@/constants/UserInterface";
import {doc, updateDoc} from "@firebase/firestore";
import {FIREBASE_DB} from "@/FirebaseConfig";
import {saveUserToStorage} from "@/utils/saveUserToStorage";

export const updateFirebaseUser=async(user:UserInterface,object:any)=>{
    if (user) {
        try {
            await updateDoc(doc(FIREBASE_DB, `Users/${user.uid}`), object);
            const newUser = {...user, ...object};
            await saveUserToStorage(JSON.stringify(newUser))
            alert("User data updated successfully");
        } catch (error) {
            console.error(error);
            alert("User data update failed");
        }
    } else {
        alert("No user data to update");
    }
}
