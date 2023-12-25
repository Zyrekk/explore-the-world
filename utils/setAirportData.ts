import AsyncStorage from "@react-native-async-storage/async-storage";
export const setAirportData = async (value: string) => {
    try {
        await AsyncStorage.setItem(
            "airportData",
            value,
        );
    } catch (error) {
        console.log(error)
    }
}