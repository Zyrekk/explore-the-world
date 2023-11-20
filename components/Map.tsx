import React from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, View} from 'react-native';


const Map = () => {
    return (
        <View style={styles.container}>
            <MapView userInterfaceStyle={"light"} style={styles.map} showsMyLocationButton={true} showsUserLocation={true} />
        </View>
    );
}

export default Map;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
