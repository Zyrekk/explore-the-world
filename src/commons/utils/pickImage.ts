import * as ImagePicker from "expo-image-picker";

export const pickImage = async (setImage:(arg1:string)=>void) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });
    if (!result.canceled) {
        // console.log(result)
        setImage(result.assets[0].uri);
    }
};
