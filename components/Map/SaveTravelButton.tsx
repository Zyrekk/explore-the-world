import {View, Text, Pressable} from 'react-native'
import React, {useEffect, useState} from 'react'
import { Feather} from "@expo/vector-icons";
import {UserInterface} from "@/constants/UserInterface";
import {getUserFromStorage} from "@/utils/getUserFromStorage";
import {doc, updateDoc} from "@firebase/firestore";
import {FIREBASE_DB} from "@/FirebaseConfig";
import {saveUserToStorage} from "@/utils/saveUserToStorage";
import {TravelPointProps} from "@/app/(auth)/home/mainHome";

interface Props {
    setMode:(mode:string)=>void;
    setTravelPoints: (points: TravelPointProps[]) => void;
    travelPoints: TravelPointProps[]
}

const SaveTravelButton = ({setTravelPoints,travelPoints,setMode}:Props) => {
    const [user, setUser] = useState<UserInterface | null>(null);
    useEffect(() => {
        getUserFromStorage().then((user) => {
            setUser(user)
        })
    }, []);
    const handleSaveTravel = async(travel:TravelPointProps[]) => {
        if(user){
            const newTravels = [...(user?.travels || []), ...travel];
            await updateDoc(doc(FIREBASE_DB, `Users/${user.uid}`), {travels:newTravels});
            await saveUserToStorage(JSON.stringify({...user, travels: newTravels}));
            alert("You can see your travels in the Travel tab below")
        }
        setMode("normal")
        setTravelPoints([])
    }
    return (
        <View className="absolute items-center flex w-full top-[130]">
            <Pressable onPress={()=>{
                handleSaveTravel(travelPoints)

                setMode("normal")
                setTravelPoints([])
            }} style={{gap:5}} className="flex w-fit min-w-[230px] bg-black px-[30] py-[15] rounded-[30px] flex-row justify-center items-center">
                <Feather name="save" size={24} color="white" />
                <Text className="text-white text-[16px]">Save travel</Text>
            </Pressable>
        </View>
    );
}

export default SaveTravelButton;
