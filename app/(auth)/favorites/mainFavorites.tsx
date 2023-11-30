import {View, Text} from 'react-native'
import React, {useEffect, useState} from 'react'
import FavMap from "@/components/Favorites/FavMap";
import {UserInterface} from "@/constants/UserInterface";
import {getUserFromStorage} from "@/utils/getUserFromStorage";
import {useFocusEffect, useRouter} from "expo-router";
import {LatLng} from "react-native-maps";

export interface FavList {
    coords: LatLng;
    id: string;
}

const MainFavorites = () => {
    const [favList, setFavList] = useState<FavList[] | null>(null);
    const router = useRouter();

    useFocusEffect(() => {
        getUserFromStorage().then((fetchedUser) => {
            if (JSON.stringify(fetchedUser?.favoritePlaces) !== JSON.stringify(favList)) {
                setFavList(fetchedUser?.favoritePlaces);
            }
        });
    });

    useEffect(() => {
        getUserFromStorage().then((fetchedUser) => {
            setFavList(fetchedUser?.favoritePlaces);
        });
    }, []);

    return (
        <View className="flex-1">
            {favList && <FavMap favList={favList} router={router}/>}
        </View>
    );
}

export default MainFavorites;
