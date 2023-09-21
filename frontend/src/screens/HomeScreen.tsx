import {SafeAreaView, StyleSheet, View} from 'react-native';
import {StartButton} from '../components/Home/StartButton';
import {Map} from '../components/Home/Map';
import * as React from "react";
import {useState} from "react";
import CreateNewJourney from "../components/CreateNewJourney";
import {LatLng} from "react-native-maps";

const HomeScreen = () => {
    const [creatorMode, setCreatorMode] = useState(false);
    const [handleType, setHandleType] = useState<string>();
    const [origin, setOrigin] = useState<LatLng | undefined>();
    const [waypoints, setWaypoints] = useState<LatLng[]>([]);
    const [destination, setDestination] = useState<LatLng | undefined>();

    const addCoordinates = (coordinates: LatLng) => {
        if (handleType === 'origin') {
            setOrigin(coordinates);
        } else if (handleType === 'destination') {
            setDestination(coordinates);
        } else {
            setWaypoints([...waypoints, coordinates]);
        }
    };

    return (
        <View style={styles.container}>
            <Map addCoordinates={addCoordinates} origin={origin} waypoints={waypoints} destination={destination}/>
            <SafeAreaView style={styles.safeContainer}>
                {!creatorMode && <StartButton text={handleType} setCreatorMode={setCreatorMode}/>}
            </SafeAreaView>
            {creatorMode && <CreateNewJourney setCreatorMode={setCreatorMode} setHandleType={setHandleType}/>}
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
