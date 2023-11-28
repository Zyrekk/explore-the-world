
import React from 'react'
import {Stack} from "expo-router";

const _Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="mainHome"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="weather"
                options={{
                    headerShown: false,
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="countryInfo"
                options={{
                    headerShown: false,
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="placeDetails"
                options={{
                    headerShown: false,
                    presentation: 'modal',
                }}
            />
        </Stack>
    );
}

export default _Layout;
