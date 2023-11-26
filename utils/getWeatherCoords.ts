import AsyncStorage from "@react-native-async-storage/async-storage";

export const getWeatherCoords = async () => {
    try {
        const value = await AsyncStorage.getItem('coordinates');
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        return null;
    }
}
