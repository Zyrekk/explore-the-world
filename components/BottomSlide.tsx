import React, { useMemo, useState} from 'react'
import BottomSheet from "@gorhom/bottom-sheet";
import {TouchableOpacity, StyleSheet, Text, View, SafeAreaView} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import MapMenu from "@/components/Map/MapMenu";
import {ClickedInfoProps} from "@/app/(auth)/home/mainHome";
import StartJourneyButton from "@/components/Map/StartJourneyButton";

interface Props{
    bottomSheetRef:React.RefObject<BottomSheet>;
    clickedInfo:ClickedInfoProps|null;
    mode:string;
    setMode:(mode:string)=>void;
}
const BottomSlide = ({bottomSheetRef,clickedInfo,mode,setMode}:Props) => {
    const snapPoints = useMemo(()=>['11%','100%'],[])
    const [refresh, setRefresh] = useState<number>(0);

    const onShowMap = () => {
        bottomSheetRef.current?.collapse();
        setRefresh(refresh + 1);
    };

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={0}
            backgroundStyle={{ backgroundColor: '#150227' }}
            handleStyle={{ backgroundColor: '#150227' }}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            handleIndicatorStyle={{ backgroundColor: "#fff" }}
            style={styles.sheetContainer}>
            <SafeAreaView style={styles.contentContainer}>
                {/*<Listings/>*/}
                <StartJourneyButton setMode={setMode}/>
                <MapMenu mode={mode} clickedInfo={clickedInfo}/>
                <View style={styles.absoluteView}>
                    <TouchableOpacity onPress={onShowMap} style={styles.btn}>
                        <Text style={{ color: '#fff' }}>Map</Text>
                        <Ionicons name="map" size={20} style={{ marginLeft: 10 }} color={'#fff'} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
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

export default BottomSlide;
