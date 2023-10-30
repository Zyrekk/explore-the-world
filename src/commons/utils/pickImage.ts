import * as ImagePicker from "expo-image-picker";

export const pickImage = async (setImage: (arg1: string) => void, setAvatar: (arg1: string) => void) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.2,
        base64: true,
    });
    if (!result.canceled) {
        setImage(result.assets[0].uri);
        if (typeof result.assets[0].base64 === 'string') {
            setAvatar(result.assets[0].base64);
        }
    }
};
