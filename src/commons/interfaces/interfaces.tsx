import { Country } from "react-native-country-picker-modal";

export interface LocalStorageUserSchema{
    uid: string;
    email: string;
    nickname: string;
    name?: string;
    lastName?: string;
    avatar?: string;
    country?: Country;
}

export interface UserData {
    uid: string;
    nickname?: string;
    name?: string;
    email?: string;
    password?: string;
    lastName?: string;
    country: {
        country: Country;
    };
    avatar?: string;
}
export interface FirebaseUserSchema {
    email: string;
    nickname: string;
    name?: string;
    lastname?: string;
    avatar?: string;
    country?: Country;
}
