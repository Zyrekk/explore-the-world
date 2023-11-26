import {View, Text} from 'react-native'
import React from 'react'

interface WeatherDetailProps {
    icon:any;
    text:string;
}
const WeatherDetail = ({icon,text}:WeatherDetailProps) => {
    return (
        <View className="flex flex-row items-center justify-center gap-2">
            {icon}
            <Text className="text-[#a1a1aa] text-[16px]">{text}</Text>
        </View>
    );
}

export default WeatherDetail;
