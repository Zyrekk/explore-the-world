import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserFromStorage = async () => {
    try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        return null;
    }
}
