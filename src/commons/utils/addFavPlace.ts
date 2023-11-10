import {LatLng} from "react-native-maps";
import {updateUser} from "./updateUser";
import {LocalStorageUserSchema} from "../interfaces/interfaces";

export const AddFavPlace = (place:LatLng,fetchedUser:LocalStorageUserSchema,setFavPoints:(favPoints:LatLng[])=>void,favPoints:LatLng[]) => {
    if(fetchedUser.favoritePlaces!==undefined) {
        updateUser(fetchedUser,{
            favoritePlaces:[...fetchedUser.favoritePlaces,place]
        })
        setFavPoints([...favPoints,place])
    }
    else{
        updateUser(fetchedUser,{
            favoritePlaces:[place]
        })
        setFavPoints([place])
    }
};

