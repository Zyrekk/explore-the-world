import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCountryCode = async () => {
  try {
    const value = await AsyncStorage.getItem("countryCode");
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    return null;
  }
};
