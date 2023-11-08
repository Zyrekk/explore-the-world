import {Pressable, StyleSheet, Text, View} from "react-native";
import {Feather, Ionicons} from '@expo/vector-icons';
import {MapTypes} from "../commons/types/MapTypes";

interface ModeModalProps{
    setMode:(mode:string)=>void;
    setIsModalVisible:(modal:boolean)=>void;
}
const ModeModal = ({setMode,setIsModalVisible}:ModeModalProps) => {

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
            <Pressable onPress={()=>{
                setMode(MapTypes.FAVOURITE)
            }} style={styles.button}>
                <Text style={styles.buttonText}>
                    Add to favourite
                </Text>
                <Ionicons name="heart" size={24} color="#fc0377" />
            </Pressable>
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