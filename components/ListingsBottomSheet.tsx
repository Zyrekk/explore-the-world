import React, {useMemo, useRef, useState} from 'react'
import BottomSheet from "@gorhom/bottom-sheet";
import {TouchableOpacity,StyleSheet,Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Listings from "@/components/Listings";

interface Props{

}

const ListingsBottomSheet = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(()=>['8%','80%'],[])
    const [refresh, setRefresh] = useState<number>(0);

    const onShowMap = () => {
        bottomSheetRef.current?.collapse();
        setRefresh(refresh + 1);
    };

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={0}
            backgroundStyle={{ backgroundColor: 'white' }}
            handleStyle={{ backgroundColor: 'white' }}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            handleIndicatorStyle={{ backgroundColor: "#3b3b3b" }}
            style={styles.sheetContainer}>
            <View style={styles.contentContainer}>
                <Listings/>
                <View style={styles.absoluteView}>
                    <TouchableOpacity onPress={onShowMap} style={styles.btn}>
                        <Text style={{ color: '#fff' }}>Map</Text>
                        <Ionicons name="map" size={20} style={{ marginLeft: 10 }} color={'#fff'} />
                    </TouchableOpacity>
                </View>
            </View>
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

export default ListingsBottomSheet;
