import { FIREBASE_AUTH } from "@/FirebaseConfig";
import {sendPasswordResetEmail} from "@firebase/auth";
import {useRouter} from "expo-router";
import {deleteUserFromStorage} from "@/utils/deleteUserFromStorage";

export const resetPassword= async(email:string,router: any,logout?:boolean)=>{
    await sendPasswordResetEmail(FIREBASE_AUTH, email).then(()=> {
        alert(logout?"You have been logged off for security reasons. Reset link has been sent to yor email address":"Reset link has been sent to yor email address")
        if(logout){
            deleteUserFromStorage()
        }
        router.push("/login")
    }).catch((error)=>alert(error.message))
}
