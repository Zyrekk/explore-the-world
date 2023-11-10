import {SafeAreaView, StyleSheet, View} from 'react-native';
import {StartButton} from '../components/Home/StartButton';
import {Map} from '../components/Home/Map';
import * as React from "react";
import {useEffect, useState} from "react";
import CreateNewJourney from "../components/CreateNewJourney";
import {LatLng} from "react-native-maps";
import {CountryInfo} from "../components/CountryInfo";
import {MapTypes} from "../commons/types/MapTypes";
import ModeModal from "../components/ModeModal";
import {LocalStorageUserSchema} from "../commons/interfaces/interfaces";
import {getUserDataFromStorage} from "../commons/utils/AuthContext";

const HomeScreen = () => {
    const [mode,setMode]=useState(MapTypes.NORMAL)
    const [user, setUser] = useState<LocalStorageUserSchema | null>(null);
    const [isModalVisible,setIsModalVisible]=useState(false)
    const [travelPoints,setTravelPoints]=useState<LatLng[]|null>(null)
    const [isMapClicked,setIsMapClicked]=useState(false)
    const [creatorMode, setCreatorMode] = useState(false);
    const [handleType, setHandleType] = useState<string>('');
    const [origin, setOrigin] = useState<LatLng | undefined>();
    const [waypoints, setWaypoints] = useState<LatLng[]>([]);
    const [destination, setDestination] = useState<LatLng | undefined>();
    const [countryCode,setCountryCode]=useState<null|string>(null)
    const [clickedPosition, setClickedPosition] = useState<LatLng | null>()
    const [favPoints, setFavPoints] = useState<LatLng[]>([]);


    const clearMap = () => {
        setOrigin(undefined);
        setWaypoints([]);
        setDestination(undefined);
        setCreatorMode(false);
        setHandleType('');
    };

    const addCoordinates = (coordinates: LatLng) => {
        if (handleType === 'origin') {
            setOrigin(coordinates);
            setHandleType('')
        } else if (handleType === 'destination') {
            setDestination(coordinates);
            setHandleType('')
        } else if (handleType === 'waypoint') {
            setWaypoints([...waypoints, coordinates]);
            setHandleType('')
        }
    };

    const getUserData = async () => {
        try {
            const userData = await getUserDataFromStorage();
            if (userData) {
                setUser(userData)
                setFavPoints(userData.favoritePlaces)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        setTimeout(()=>{
            getUserData();
        },500)
    }, []);


    return (
        <View style={styles.container}>
                <>
                    <Map mode={mode} favPoints={favPoints} setIsModalVisible={setIsModalVisible} setIsMapClicked={setIsMapClicked} setCountryCode={setCountryCode} addCoordinates={addCoordinates} setClickedPosition={setClickedPosition} origin={origin}
                         waypoints={waypoints} destination={destination}
                         clearMap={clearMap} handleType={handleType}/>
                    <SafeAreaView style={styles.safeContainer}>
                        {!creatorMode && <StartButton text={handleType} setCreatorMode={setCreatorMode}/>}
                    </SafeAreaView>
                </>

            {isModalVisible && clickedPosition && <ModeModal favPoints={favPoints} setFavPoints={setFavPoints} clickedPosition={clickedPosition} setIsModalVisible={setIsModalVisible}  setMode={setMode}/>}
            {mode===MapTypes.INFO && clickedPosition && countryCode && <CountryInfo setCode={setCountryCode} setMode={setMode} setIsModalVisible={setIsModalVisible} code={countryCode} setClickedPosition={setClickedPosition} clickedPosition={clickedPosition}/>}

            {/*{creatorMode && <CreateNewJourney origin={origin} waypoints={waypoints} destination={destination}*/}
            {/*                                  setCreatorMode={setCreatorMode} setHandleType={setHandleType}/>}*/}
            {/*{isMapClicked && countryCode && <CountryInfo setCode={setCountryCode} code={countryCode} setClickedPosition={setClickedPosition} coordinate={clickedPosition}/>}*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: '100%',
        alignItems: 'center',
    },
    safeContainer: {
        width: '100%',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
    },
    clearButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
    },
});

export {HomeScreen};
