import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import {User, onAuthStateChanged} from 'firebase/auth'
import { FIREBASE_AUTH } from "@/FirebaseConfig";
// import * as SecureStore from "expo-secure-store";

const InitialLayout = () => {
  const router = useRouter();
  const [user,setUser]=useState<User | null>(null)
  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH,(user)=>{
      setUser(user);
    })
  },[])

  useEffect(() => {
    if(user){
      router.replace("/home");
    }
    else{
      router.replace("/login"); 
    }
  }, [user]);

  return <Slot />;
};

const RootLayout = () => {
  return (
    <InitialLayout />
  );
};

export default RootLayout;
