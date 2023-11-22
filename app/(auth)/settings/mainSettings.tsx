import {View, Text, SafeAreaView} from 'react-native'
import React from 'react'
import {Link} from "expo-router";

const MainSettings = () => {
    return (
        <SafeAreaView>
            <Link href={"/settings/modal"}>
                ops
            </Link>
        </SafeAreaView>
    );
}

export default MainSettings;
