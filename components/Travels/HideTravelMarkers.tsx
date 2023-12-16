import { View, Text, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const HideTravelMarkers = ({
                               setClickedTravel,
                            }: {
    setClickedTravel: (travel: null) => void;
}) => {
    return (
        <View className="absolute items-center flex w-full top-[50]">
            <Pressable
                onPress={() => {
                    setClickedTravel(null);
                }}
                style={{ gap: 5 }}
                className="flex w-fit bg-black px-[30] py-[15] rounded-[30px] flex-row items-center"
            >
                <Entypo name="cross" size={24} color="white" />
                <Text className="text-white text-[16px]">Delete markers</Text>
            </Pressable>
        </View>
    );
};

export default HideTravelMarkers;
