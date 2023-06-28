import React from "react";
import {StyleSheet,SafeAreaView} from "react-native";

const UserInformation = () => {


    return (
        <SafeAreaView style={styles.userInfo}>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    userInfo:{
        backgroundColor:"red",
        height:"100%",
        width:"100%",
    }
});

export {UserInformation};
