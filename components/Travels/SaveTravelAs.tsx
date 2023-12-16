import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native'
import React, {useEffect, useState} from 'react'
import {TravelPointProps} from "@/app/(auth)/home/mainHome";
import {doc, updateDoc} from "@firebase/firestore";
import {FIREBASE_DB} from "@/FirebaseConfig";
import {saveUserToStorage} from "@/utils/saveUserToStorage";
import {UserInterface} from "@/constants/UserInterface";
import {getUserFromStorage} from "@/utils/getUserFromStorage";
import {Entypo, Feather} from "@expo/vector-icons";
interface Props {
    setMode:(mode:string)=>void;
    setTravelPoints: (points: TravelPointProps[]) => void;
    travelPoints: TravelPointProps[];
    setIsSaveClicked: (value: boolean) => void;
}
const SaveTravelAs = ({setTravelPoints,setIsSaveClicked,travelPoints,setMode}:Props) => {
    const [user, setUser] = useState<UserInterface | null>(null);
    const [value, setValue] = useState("");
    useEffect(() => {
        getUserFromStorage().then((user) => {
            setUser(user)
        })
    }, []);
    const handleSaveTravel = async(travel:TravelPointProps[]) => {
        if(value===""){
            alert("Please type travel name")
            return
        }
        if(user){
            const newTravel={
                name:value,
                places:travel
            }
            const updatedTravels = [...(user?.travels || []), newTravel];
            await updateDoc(doc(FIREBASE_DB, `Users/${user.uid}`), {travels:updatedTravels});
            await saveUserToStorage(JSON.stringify({...user, travels: updatedTravels}));
            alert("You can see your travels in the Travel tab below")
        }
        setMode("normal")
        setTravelPoints([])
        setIsSaveClicked(false)
    }
    return (
        <View className="absolute w-full top-[0] h-full flex items-center bg-black py-[30px] left-0 ">
            <View className="w-[80%]">
                <Pressable onPress={()=>{
                    setIsSaveClicked(false)
                }} className="mt-[30] self-start">
                    <Entypo name="cross" size={36} color="white" />
                </Pressable>
            </View>
            <View className="w-[80%] flex items-center flec-col mt-[30] ">
            <Text className="text-white text-[22px] mb-[30px]">Name your travel</Text>
                <View style={styles.container}>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            gap: 10,
                        }}
                    >
                        <Text style={styles.label}>Travel name</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Type travel name"
                            value={value}
                            onChangeText={(text)=>{
                                setValue(text)
                            }}
                            autoCorrect={false}
                            placeholderTextColor="#fff"
                            underlineColorAndroid="transparent"
                        />
                    </View>
                </View>
                <View className=" items-center flex w-full border-white border-[2px] rounded-[40px] mt-[50px]">
                    <Pressable onPress={()=>{
                        handleSaveTravel(travelPoints)
                    }} style={{gap:5}} className="flex w-fit min-w-[230px] bg-black px-[30] py-[15] rounded-[30px] flex-row justify-center items-center">
                        <Feather name="save" size={24} color="white" />
                        <Text className="text-white text-[16px]">Save travel</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "100%",
        gap: 15,
        flexDirection: "column",
    },
    label: {
        fontSize: 16,
        color: "white",
    },
    inputContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 40,
        width: "100%",
        borderWidth: 2,
        paddingHorizontal: 20,
        borderColor: "white",
        height: 60,
        gap: 10,
        flexDirection: "row",
    },
    input: {
        fontSize: 14,
        flex: 1,
        color: "white",
    },
});


export default SaveTravelAs;
