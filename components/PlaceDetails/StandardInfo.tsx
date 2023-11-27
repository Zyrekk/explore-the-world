import {View, Text} from 'react-native'
import React from 'react'
import {Ionicons} from "@expo/vector-icons";

interface StandardInfoProps {
    text: string;
    icon:any
}
const StandardInfo = ({icon,text}:StandardInfoProps) => {
    return (
        <View style={{gap: 10}} className="flex flex-row items-start mt-[20]">
            {icon}
            <Text className="text-white text-[18px] font-light break-words w-[80%]">{text}</Text>
        </View>
    );
}

export default StandardInfo;
