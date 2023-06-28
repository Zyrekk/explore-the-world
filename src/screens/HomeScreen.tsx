import { View, StyleSheet } from 'react-native';
import { StartButton } from '../components/Home/StartButton';
import { Map } from '../components/Home/Map';
import {Navigation} from "../components/Home/Navigation";
import * as React from "react";

const HomeScreen= () => {

    return (
        <View style={styles.container}>
            <StartButton/>
            <Map />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: '100%',
        alignItems: 'center',
    },
});

export { HomeScreen };
