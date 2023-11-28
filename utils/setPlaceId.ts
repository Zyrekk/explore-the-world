import AsyncStorage from "@react-native-async-storage/async-storage";

export const setPlaceId = async (value: string) => {
    try {
        await AsyncStorage.setItem(
            "placeid",
            value,
        );
    } catch (error) {
        console.log(error)
    }
}
