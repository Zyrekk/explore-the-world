import { Country } from "react-native-country-picker-modal";

export interface LocalStorageUserSchema{
    uid: string;
    email: string;
    nickname: string;
    name?: string;
    lastname?: string;
    avatar?: string;
    country?: Country;
}

export interface FirebaseUserSchema {
    email: string;
    nickname: string;
    name?: string;
    lastname?: string;
    avatar?: string;
    country?: Country;
}
