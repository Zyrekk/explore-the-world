import {LatLng} from "react-native-maps";
import { Country } from "react-native-country-picker-modal";
import {TravelPointProps} from "@/app/(auth)/home/mainHome";

export interface UserInterface{
    uid: string;
    email: string;
    nickname: string;
    name?: string;
    lastname?: string;
    avatar?: string;
    country?: Country;
    favoritePlaces?: {coords:LatLng,id:string}[];
    travels?:{
        name:string;
        places:TravelPointProps[]
    }[];
}
