import {View, Text, Pressable, TouchableOpacity} from 'react-native'
import React from 'react'

const StartJourneyButton = () => {
    return (
            <TouchableOpacity className="w-full bg-black text-white py-[15] rounded-[30px]">
                    <Text className="text-white text-center font-semibold text-[16px]"> Start the journey  🚀</Text>
            </TouchableOpacity>
    );
}

export default StartJourneyButton;
