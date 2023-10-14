import { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Country } from "react-native-country-picker-modal";
import { UserDataToPost } from "../interfaces/interfaces";

export interface UserContext {
    user: UserDataToPost | null;
    setUser: (user: UserDataToPost | null) => void;
}

export const getUserDataFromStorage = async () => {
    try {
        const userData = await AsyncStorage.getItem("userData");
        console.log("user loaded");
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error("Error retrieving user data from storage:", error);
        return null;
    }
};

export const removeUserDataFromStorage = async () => {
    try {
        await AsyncStorage.removeItem("userData");
        console.log("removed");
    } catch (error) {
        console.error("Error removing user data from storage:", error);
    }
};
export const setUserDataToStorage = async (userData: UserDataToPost) => {
    try {
        await AsyncStorage.setItem("userData", JSON.stringify(userData));
        console.log("user saved");
    } catch (error) {
        console.error("Error saving user data to storage:", error);
    }
};

export const AuthContext = createContext<UserContext>({
    setUser(user: UserDataToPost | null): void {},
    user: null,
});
