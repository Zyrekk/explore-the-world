import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React from 'react'
import {renderAvatar} from "@/utils/renderAvatar";
import {pickImage} from "@/utils/pickImage";
import {AntDesign, Ionicons} from "@expo/vector-icons";

export interface AvatarProps{
    avatar: string;
    image: string|null;
}
interface Props {
avatar:AvatarProps;
setAvatar:(avatar:AvatarProps)=>void;
}
const Avatar = ({avatar,setAvatar}:Props) => {
    return (
        <View style={styles.avatarContainer}>
            {renderAvatar(avatar.avatar, avatar.image)}
            <TouchableOpacity
                style={styles.avatarEditLayout}
                onPress={() => pickImage(setAvatar,avatar)}
            >
                <AntDesign name="edit" size={24} color="white" />
                <Text style={{color:"white"}}>
                    Edit avatar
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles=StyleSheet.create({
    avatarContainer: {
        marginTop:30,
        position: "relative",
        // backgroundColor:"#c4c4c4",
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "white",
        display: "flex",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        width: "30%",
        aspectRatio: "1/1",
    },
    avatarEditLayout: {
        position: "absolute",
        display: "flex",
        gap: 5,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
})

export default Avatar;
