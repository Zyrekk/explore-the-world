import React, {useState, useEffect} from "react";
import {Text, StyleSheet,Pressable, Animated, SafeAreaView} from "react-native";

const StartButton = () => {
    const [clicked, setClicked] = useState(false);
    const opacityValue = useState(new Animated.Value(1))[0];

    useEffect(() => {
        Animated.timing(opacityValue, {
            toValue: clicked ? 0 : 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, [clicked, opacityValue]);

    return (
        <SafeAreaView style={styles.header}>
            <Animated.View style={[styles.animatedView, {opacity: opacityValue}]}>
                <Pressable style={styles.startButton} onPress={() => {
                    setClicked(!clicked)
                }}>
                    <Text style={styles.startButtonText}>Start the journey 🚀</Text>
                </Pressable>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        zIndex:100,
        position:"absolute",
        top:0,
        width:"100%"
    },
    animatedView: {
        display: "flex",
        alignItems: "center",
    },
    startButton:{
        backgroundColor: "#1B3370",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width:"85%",
        paddingVertical: 13,
        borderRadius: 50,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.8,
        shadowRadius: 5,
    },
    startButtonText: {
        fontSize: 16,
        color: "#fff",
    },
});

export {StartButton};
