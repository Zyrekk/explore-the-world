import {Pressable, Text, View} from 'react-native'
import React from 'react'

interface Props {
    icon:any;
    title:string;
}
const MapMenuButton = ({icon,title}:Props) => {
    return (
        <Pressable className="w-full rounded-[18px] bg-black">
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
