import {SafeAreaView, StyleSheet, View} from 'react-native';
import {StartButton} from '../components/Home/StartButton';
import {Map} from '../components/Home/Map';
import * as React from "react";
import {useState} from "react";
import CreateNewJourney from "../components/CreateNewJourney";
import {LatLng} from "react-native-maps";
import {CountryInfo} from "../components/CountryInfo";

const HomeScreen = () => {
    const [creatorMode, setCreatorMode] = useState(false);
    const [handleType, setHandleType] = useState<string>('');
    const [origin, setOrigin] = useState<LatLng | undefined>();
    const [waypoints, setWaypoints] = useState<LatLng[]>([]);
    const [destination, setDestination] = useState<LatLng | undefined>();

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

    return (
        <View style={styles.container}>
            <Map addCoordinates={addCoordinates} origin={origin} waypoints={waypoints} destination={destination}
                 clearMap={clearMap} handleType={handleType}/>
            <SafeAreaView style={styles.safeContainer}>
                {!creatorMode && <StartButton text={handleType} setCreatorMode={setCreatorMode}/>}
            </SafeAreaView>
            {creatorMode && <CreateNewJourney origin={origin} waypoints={waypoints} destination={destination}
                                              setCreatorMode={setCreatorMode} setHandleType={setHandleType}/>}
            {/*<CountryInfo code={"DZ"}/>*/}
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
