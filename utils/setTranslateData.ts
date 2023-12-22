import AsyncStorage from "@react-native-async-storage/async-storage";
export const setTranslateData = async (value: string) => {
    try {
        await AsyncStorage.setItem(
            "translateData",
            value,
        );
    } catch (error) {
        console.log(error)
    }
}