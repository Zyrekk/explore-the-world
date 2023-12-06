import {View, Text, Pressable} from 'react-native'
import React from 'react'
import { Feather} from "@expo/vector-icons";

interface Props {
    setIsSaveClicked: (value: boolean) => void;
}

const SaveTravelButton = ({setIsSaveClicked}:Props) => {


    return (
        <View className="absolute items-center flex w-full top-[130]">
            <Pressable onPress={()=>{
                setIsSaveClicked(true)
            }} style={{gap:5}} className="flex w-fit min-w-[230px] bg-black px-[30] py-[15] rounded-[30px] flex-row justify-center items-center">
                <Feather name="save" size={24} color="white" />
                <Text className="text-white text-[16px]">Save travel</Text>
            </Pressable>
        </View>
    );
}

export default SaveTravelButton;
