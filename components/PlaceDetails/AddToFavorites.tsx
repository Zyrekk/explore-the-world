import {View, Text, Pressable} from 'react-native'
import React, {useEffect, useState} from 'react'
import {AntDesign} from "@expo/vector-icons";
import {UserInterface} from "@/constants/UserInterface";
import {getUserFromStorage} from "@/utils/getUserFromStorage";
import {saveUserToStorage} from "@/utils/saveUserToStorage";
import {doc, updateDoc} from "@firebase/firestore";
import {FIREBASE_DB} from "@/FirebaseConfig";
import {PlaceInfo} from "@/components/Favorites/FavDetails";
import {Link, useRouter} from "expo-router";

const AddToFavorites = ({placeFav,refresh}: {refresh:boolean, placeFav: PlaceInfo }) => {
    const [user, setUser] = useState<UserInterface | null>(null);
    const [fav, setFav] = useState(false)
    const router=useRouter()
    useEffect(() => {
        getUserFromStorage().then((user) => {
            setUser(user)
            const temp = user as UserInterface
            if (temp.favoritePlaces?.some(place => place.id === placeFav.placeid)) {
                setFav(true)
            }
        })
    }, []);

    const handleToggleFavorite = async(user:UserInterface) => {
        const isAlreadyFavorite = user?.favoritePlaces?.some(place => place.id === placeFav.placeid);

        if (isAlreadyFavorite) {
            const updatedFavorites = (user?.favoritePlaces || []).filter(place => place.id !== placeFav.placeid);
            setUser({...user, favoritePlaces: updatedFavorites});
            await updateDoc(doc(FIREBASE_DB, `Users/${user.uid}`), {favoritePlaces:updatedFavorites});
            await saveUserToStorage(JSON.stringify({...user, favoritePlaces: updatedFavorites}));
        } else {
            const updatedFavorites = [...(user?.favoritePlaces || []), { id: placeFav.placeid, coords: placeFav.coords }];
            setUser({...user, favoritePlaces: updatedFavorites});
            await updateDoc(doc(FIREBASE_DB, `Users/${user.uid}`), {favoritePlaces:updatedFavorites});
            await saveUserToStorage(JSON.stringify({...user, favoritePlaces: updatedFavorites}));
        }
        setFav(!isAlreadyFavorite);
        if(refresh){
            router.replace("/favorites/mainFavorites")
        }
    };
    return (
        <View style={{gap: 10}} className="flex flex-row items-center mt-[20]">
            <Pressable onPress={()=>{
                if(user){
                    handleToggleFavorite(user)
                }
            }}>
                {fav ? <AntDesign name="heart" size={32} color="red"/> :
                    <AntDesign name="heart" size={32} color="gray"/>}
            </Pressable>
            {fav ? <Text style={{color: "white", fontSize: 18}}>Remove from favorites</Text> :
                <Text style={{color: "white", fontSize: 18}}>Add to favorites</Text>}
        </View>
    );
}

export default AddToFavorites;
