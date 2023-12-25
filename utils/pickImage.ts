import * as ImagePicker from "expo-image-picker";
import {AvatarProps} from "@/components/UserEdit/Avatar";

export const pickImage = async (setAvatar:(avatar:AvatarProps)=>void,avatar:AvatarProps) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
        base64: true,
    });
    if (!result.canceled) {
        const stateSize = new Blob([result.assets[0].uri]).size
        const stateSize2 =new Blob([result.assets[0].base64 as string]).size
        if(stateSize>1048487 || stateSize2>1048487){
            alert("Image is too big")
            return
        }

        setAvatar({...avatar,image:result.assets[0].uri,avatar:result.assets[0].base64 as string})
    }
};
