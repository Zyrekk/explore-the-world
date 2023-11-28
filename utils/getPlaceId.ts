import AsyncStorage from "@react-native-async-storage/async-storage";

export const getPlaceId = async () => {
    try {
        const value = await AsyncStorage.getItem('placeid');
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        return null;
    }
}
