import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserToStorage = async (value: string) => {
    try {
        await AsyncStorage.setItem(
            "user",
            value,
        );
    } catch (error) {
        console.log(error)
    }
}
