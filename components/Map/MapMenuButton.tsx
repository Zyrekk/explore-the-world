import {Pressable, Text, View} from 'react-native'
import React from 'react'
import {router} from "expo-router";

interface Props {
    icon:any;
    title:string;
    path:string;
    router:any;
}
const MapMenuButton = ({icon,title,path}:Props) => {
    return (
        <Pressable onPress={()=>{
            // @ts-ignore
            router.push(path)
        }} className="w-full rounded-[18px] bg-black">
            <View className="flex flex-row gap-5 items-center justify-center px-[15] py-[15]">
                <Text className="text-[16px] font-semibold text-white">
                    {title}
                </Text>
                {icon}
            </View>
        </Pressable>
    );
}

export default MapMenuButton;
