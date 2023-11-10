import {Pressable, StyleSheet, Text, View} from "react-native";
import {Feather, Ionicons} from '@expo/vector-icons';
import {MapTypes} from "../commons/types/MapTypes";
import {AddFavPlace} from "../commons/utils/addFavPlace";
import {LatLng} from "react-native-maps";
import {useEffect, useState} from "react";
import {getUserDataFromStorage} from "../commons/utils/AuthContext";
import {LocalStorageUserSchema} from "../commons/interfaces/interfaces";

interface ModeModalProps{
    setMode:(mode:string)=>void;
    setIsModalVisible:(modal:boolean)=>void;
    clickedPosition:LatLng;
    setFavPoints:(favPoints:LatLng[])=>void;
    favPoints:LatLng[];
}
const ModeModal = ({setFavPoints,favPoints,setMode,clickedPosition,setIsModalVisible}:ModeModalProps) => {
    const [user, setUser] = useState<LocalStorageUserSchema | null>(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userData = await getUserDataFromStorage();
                if (userData) {
                    setUser(userData);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        getUserData();
    }, []);

    return (
        <View style={styles.modalContainer}>
                <Pressable style={{padding:5}} onPress={()=>{
                    setIsModalVisible(false)
                }}>
                    <Feather name="x" size={24} color="white" />
                </Pressable>
            <Text style={styles.title}>Choose an option</Text>
            <Pressable onPress={()=>{
                setMode(MapTypes.INFO)
            }} style={styles.button}>
                <Text style={styles.buttonText}>
                    Country info
                </Text>
                <Ionicons name="information-circle-outline" size={24} color="white" />
            </Pressable>
            {user && <Pressable onPress={()=>{
                AddFavPlace(clickedPosition,user,setFavPoints,favPoints)
            }} style={styles.button}>
                <Text style={styles.buttonText}>
                    Add to favourite
                </Text>
                <Ionicons name="heart" size={24} color="#fc0377" />
            </Pressable>}
        </View>
    )

}

export default ModeModal

const styles = StyleSheet.create({
    modalContainer: {
        position:"absolute",
        top:"35%",
        width: "70%",
        backgroundColor: "#030712",
        display: "flex",
        paddingBottom: 35,
        paddingTop:30,
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 10,
        gap: 20
    },
    title:{
      color:"#fff",
        fontSize:24
    },
    button: {
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        paddingHorizontal:20,
        flexDirection:"row",
        gap:10,
        width: "85%",
        paddingVertical: 15,
        borderRadius:10,
        borderWidth: 1,
        borderColor: "#fff"
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center"
    }
})
