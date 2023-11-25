import * as ImagePicker from "expo-image-picker";
import {AvatarProps} from "@/components/UserEdit/Avatar";

export const pickImage = async (setAvatar:(avatar:AvatarProps)=>void,avatar:AvatarProps) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.2,
        base64: true,
    });
    if (!result.canceled) {
        setAvatar({...avatar,image:result.assets[0].uri,avatar:result.assets[0].base64 as string})
    }
};
