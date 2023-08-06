import {Country} from "react-native-country-picker-modal";

export interface UserData {
    username?: string;
    name?: string;
    email?: string;
    password?: string;
    lastName?: string;
    country: {

        country: Country;
    }
    avatar?: string;
}
