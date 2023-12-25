import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAirportData = async () => {
    try {
        const value = await AsyncStorage.getItem('airportData');
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        return null;
    }
}
