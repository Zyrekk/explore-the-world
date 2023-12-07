import {View, Text, Pressable} from 'react-native'
import React, {useState} from 'react'
import {editStyles} from "@/components/UserEdit/EditField";
import countryEmoji from "country-emoji";
import {EditProps} from "@/app/(auth)/settings/edit";
import {AntDesign} from "@expo/vector-icons";


interface CountryProps {
    editUser: EditProps;
    setShowCountryPicker: (value: boolean) => void;
}
const CountryField = ({editUser,setShowCountryPicker}:CountryProps) => {
    return (
        <View style={editStyles.dataEditionContent}>
            <View style={editStyles.singleValueEdit}>
                <Text style={{color:"white"}}>
                    Nationality{" "}
                </Text>
                <View
                    style={editStyles.inputContainer}>
                    <View>
                        <Text>
                            {editUser.country && countryEmoji.flag(
                                editUser.country?.cca2
                            ) || "❓"}
                        </Text>
                    </View>
                    <Pressable
                        style={[editStyles.countryInput]}
                        onPress={() => {
                            setShowCountryPicker(true);
                        }}
                    >
                        <Text style={[{color:"white",fontSize:16}]}>
                            {editUser.country && editUser.country.name.toString()}
                        </Text>
                    </Pressable>
                    <AntDesign name="edit" size={24} color="white" />
                </View>
            </View>
        </View>
    );
}
export default CountryField;
