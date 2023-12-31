import {View} from 'react-native'
import React, {useEffect, useState} from 'react'
import FavMap from "@/components/Favorites/FavMap";
import {getUserFromStorage} from "@/utils/getUserFromStorage";
import {useFocusEffect, useRouter} from "expo-router";
import {LatLng} from "react-native-maps";
import FavBottomSlide from "@/components/Favorites/FavBottomSlide";

export interface FavList {
    coords: LatLng;
    id: string;
    address:string;
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
        console.log('xD1')
    });

    useEffect(() => {
        getUserFromStorage().then((fetchedUser) => {
            setFavList(fetchedUser?.favoritePlaces);
        });
        console.log('xD12')
    }, []);

    return (
        <View className="flex-1">
             <FavMap favList={favList} router={router}/>
            {favList && <FavBottomSlide favList={favList} router={router}/>}
        </View>
    );
}

export default MainFavorites;
