import AsyncStorage from "@react-native-async-storage/async-storage";

export const setWeatherCoords = async (value: string) => {
    try {
        await AsyncStorage.setItem(
            "coordinates",
            value,
        );
    } catch (error) {
        console.log(error)
    }
}
