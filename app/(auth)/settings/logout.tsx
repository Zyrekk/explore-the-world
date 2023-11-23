import {View} from 'react-native'
import React, {useEffect} from 'react'
import {deleteUserFromStorage} from "@/utils/deleteUserFromStorage";
import {useRouter} from "expo-router";

const Logout = () => {
    const router=useRouter();
    const logout = () => {
        deleteUserFromStorage().then(()=>{
            router.replace("/landing")
        })
    }

    useEffect(() => {
        logout()

    }, []);
}

export default Logout;
