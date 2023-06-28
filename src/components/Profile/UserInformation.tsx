import React from "react";
import {StyleSheet, SafeAreaView, Text} from "react-native";

const UserInformation = () => {
    return (
        <SafeAreaView style={styles.userInfo}>
            <Text>PROFILE SCREEN</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    userInfo:{
        // backgroundColor:"red",
        height:"100%",
        width:"100%",
    }
});

export {UserInformation};
