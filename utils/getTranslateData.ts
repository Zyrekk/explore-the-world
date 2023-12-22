import AsyncStorage from "@react-native-async-storage/async-storage";

export const getTranslateData = async () => {
    try {
        const value = await AsyncStorage.getItem('translateData');
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        return null;
    }
}
