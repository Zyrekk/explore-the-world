import { Country } from "react-native-country-picker-modal";
import {LatLng} from "react-native-maps";

export interface LocalStorageUserSchema{
    uid: string;
    email: string;
    nickname: string;
    name?: string;
    lastname?: string;
    avatar?: string;
    country?: Country;
    favoritePlaces: LatLng[];
}

export interface FirebaseUserSchema {
    email: string;
    nickname: string;
    name?: string;
    lastname?: string;
    avatar?: string;
    country?: Country;
    favoritePlaces: LatLng[];
}
