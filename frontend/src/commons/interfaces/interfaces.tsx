import { Country } from "react-native-country-picker-modal";

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

export interface UserDataSchema {
    uid: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    lastLoginAt: string;
    phoneNumber: undefined | string;
    photoURL: undefined | string;
    providerData: [[Object]];
}

export interface FirebaseUserSchema {
    uid: string;
    email: string;
    nickname: string;
    name?: string;
    lastname?: string;
    avatar?: string;
    country?: Country;
}
