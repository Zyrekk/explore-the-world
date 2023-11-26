import {View, Text, StyleSheet, TextInput} from 'react-native'
import React from 'react'
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {EditProps} from "@/app/(auth)/settings/edit";

interface EditFieldProps {
    type:string;
    placeholder:string;
    icon: any;
    setEditUser:(user:EditProps)=>void;
    editUser: EditProps;
}

const EditField = ({editUser,type,setEditUser,placeholder,icon}:EditFieldProps) => {
    return (
        <View style={editStyles.dataEditionContent}>
            <View style={editStyles.singleValueEdit}>
                <Text style={{color:"black"}}>
                    {placeholder}
                </Text>
                <View
                    style={editStyles.inputContainer}
                >
                    {icon}
                    <TextInput
                        onChangeText={(text)=>{
                            setEditUser({...editUser,[type]:text})
                        }}
                        value={editUser[type]}
                        style={[editStyles.input, { fontSize: 16,color:"black"}]}
                        placeholder={placeholder}
                        autoCorrect={false}
                        placeholderTextColor="black"
                        underlineColorAndroid="transparent"
                    />
                    <AntDesign name="edit" size={24} color="black" />
                </View>
            </View>
        </View>
    );
}

export const editStyles=StyleSheet.create({
    singleValueEdit: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    dataEditionContent: {
        marginTop: 20,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        display: "flex",
        paddingHorizontal: 15,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 40,
        width: "100%",
        borderWidth: 2,
        borderColor: "black",
        height: 50,
        gap: 10,
        flexDirection: "row",
    },
    input: {
        height: 40,
        flex: 1,
    },
    countryInput: {
        height: 40,
        display: "flex",
        justifyContent: "center",
        flex: 1,
    },
})

export default EditField;
