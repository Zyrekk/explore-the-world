import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";

interface StartButtonProps {
    setCreatorMode: (bool: boolean) => void;
    text: string | undefined;
}

const StartButton = ({setCreatorMode, text}: StartButtonProps) => {

    const renderText = () => {
        if (text !== undefined) {
            if (text === 'origin') {
                return 'Choose your origin'
            }
            if (text === 'destination') {
                return 'Choose your destination'
            }
            if (text === 'waypoints') {
                return 'Choose your waypoint'
            }
        }
    }

    return (
        <View style={styles.animatedView}>
            <Pressable style={styles.startButton} onPress={() => {
                setCreatorMode(true)
            }}>
                <Text style={styles.startButtonText}>{text ? renderText() : 'Start the journey 🚀'}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    headerIos: {
        zIndex: 100,
        width: "100%"
    },
    headerAndroid: {
        zIndex: 100,
        position: "absolute",
        top: 50,
        width: "100%"
    },
    animatedView: {
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    startButton: {
        backgroundColor: "#030712",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "85%",
        paddingVertical: 13,
        borderRadius: 50,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.8,
        shadowRadius: 5,
    },
    startButtonText: {
        fontSize: 16,
        // color: "black",
        color: "white"
    },
});

export {StartButton};
