
import React from 'react'
import {Stack} from "expo-router";

const _Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="mainFavorites"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="details"
                options={{
                    headerShown: false,
                    presentation: 'modal',
                }}
            />
        </Stack>
    );
}

export default _Layout;
