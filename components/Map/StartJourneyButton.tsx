import {View, Text, Pressable, TouchableOpacity} from 'react-native'
import React from 'react'
import {useRouter} from "expo-router";

const StartJourneyButton = () => {
    const router=useRouter()
    return (
            <TouchableOpacity onPress={()=>{
                router.push("/home/weather")
            }} className="w-full bg-black text-white py-[15] rounded-[30px]">
                    <Text className="text-white text-center font-semibold text-[16px]"> Start the journey  🚀</Text>
            </TouchableOpacity>
    );
}

export default StartJourneyButton;
