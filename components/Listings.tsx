import {View, StyleSheet, Text, Pressable, SafeAreaView} from 'react-native'
import React from 'react'
import {Link, useRouter} from "expo-router";
import {resetPassword} from "@/utils/resetPassword";

const Listings = () => {
    const router=useRouter()
    return (
        <SafeAreaView>
            <Text style={{color:"black"}}>Listings</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:5,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    }

})

export default Listings;
