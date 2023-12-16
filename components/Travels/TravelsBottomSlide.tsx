import {View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Pressable} from 'react-native'
import React, {useEffect, useMemo, useRef, useState} from 'react'
import BottomSheet from "@gorhom/bottom-sheet";
import {Ionicons} from "@expo/vector-icons";
import {TravelPointProps} from "@/app/(auth)/home/mainHome";
import {UserInterface} from "@/constants/UserInterface";
import {getUserFromStorage} from "@/utils/getUserFromStorage";
import {doc, updateDoc} from "@firebase/firestore";
import {FIREBASE_DB} from "@/FirebaseConfig";
import {saveUserToStorage} from "@/utils/saveUserToStorage";

interface Props {
    setClickedTravel: (travel: TravelPointProps[]) => void;
    user:UserInterface;
    setUser:(user:UserInterface)=>void;
}


const TravelsBottomSlide = ({user,setUser,setClickedTravel}: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['11%', '100%'], [])
    const [refresh, setRefresh] = useState<number>(0);

    const onShowMap = () => {
        bottomSheetRef.current?.collapse();
        setRefresh(refresh + 1);
    };

    const deleteTravelByIndex = async (index: number) => {
        if (user && user.travels) {
            const updatedTravels = user.travels.filter((travel, i) => i !== index);
            await updateDoc(doc(FIREBASE_DB, `Users/${user.uid}`), {travels:updatedTravels});
            await saveUserToStorage(JSON.stringify({...user, travels: updatedTravels}));
            setUser({...user, travels: updatedTravels})
            alert("Travel deleted")
        }
    }


    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={0}
            backgroundStyle={{backgroundColor: '#150227'}}
            handleStyle={{backgroundColor: '#150227'}}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            handleIndicatorStyle={{backgroundColor: "#fff"}}
            style={styles.sheetContainer}>

            <SafeAreaView style={styles.contentContainer}>
                <Text className="text-white text-[24px] mb-[30]">Your travel list</Text>
                {user && user.travels && user.travels.map((travel, index) =>
                    <View
                        className="border-white flex flex-row items-center justify-between border-[2px] rounded-[40px] px-[20] py-[10] w-full"
                        key={index}>
                        <Text className="text-white text-[20px]">{travel.name}</Text>
                        <View style={{gap: 10}} className="flex flex-row">
                            <Pressable className="bg-green-700 rounded-[40px]" onPress={() => {
                                setClickedTravel(travel.places)
                                bottomSheetRef.current?.collapse()
                            }}>
                                <Text
                                    className="text-white px-[10] py-[5] rounded-[10px] text-center w-full font-bold text-[16px]">Select</Text>
                            </Pressable>
                            <Pressable onPress={()=>{
                                deleteTravelByIndex(index)
                            }} className="bg-red-500 rounded-[40px]">
                                <Text
                                    className="text-white px-[10] py-[5] rounded-[10px] text-center w-full font-bold text-[16px]">Delete</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            </SafeAreaView>
            <View style={styles.absoluteView}>
                <TouchableOpacity onPress={onShowMap} style={styles.btn}>
                    <Text style={{color: '#fff'}}>Map</Text>
                    <Ionicons name="map" size={20} style={{marginLeft: 10}} color={'#fff'}/>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: "center",
        gap: 15,
        marginHorizontal: 20
    },
    absoluteView: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: "#000",
        padding: 14,
        height: 50,
        borderRadius: 30,
        flexDirection: 'row',
        marginHorizontal: 'auto',
        alignItems: 'center',
    },
    sheetContainer: {
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
});

export default TravelsBottomSlide;
