import {View, Text, Linking, TouchableOpacity} from 'react-native'
import React from 'react'
import {Ionicons} from "@expo/vector-icons";
import {Link} from "expo-router";

interface StandardInfoProps {
    text: string;
    icon: any
}

const StandardInfo = ({icon, text}: StandardInfoProps) => {
    const openLink = () => {
        const url = text;

        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.error("Don't know how to open URI: " + url);
            }
        });
    };
    return (
        <View style={{gap: 10}} className="flex flex-row items-start mt-[20]">
            {icon}
            {text.includes("http")
                ?
                <TouchableOpacity className="w-[80%]" onPress={openLink}>
                    <Text className="text-white text-[18px] font-light break-words">{text}</Text>
                </TouchableOpacity>
                :
                <Text className="text-white text-[18px] font-light break-words w-[80%]">{text}</Text>
            }
        </View>
    );
}

export default StandardInfo;
