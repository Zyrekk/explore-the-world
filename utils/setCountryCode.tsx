import AsyncStorage from "@react-native-async-storage/async-storage";

export const setCountryCode = async (value: string) => {
  try {
    await AsyncStorage.setItem("countryCode", value);
  } catch (error) {
    console.log(error);
  }
};
