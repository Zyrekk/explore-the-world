import {Stack} from 'expo-router';

const Settings = () => {
    return (
        <Stack>
            <Stack.Screen
                name="mainSettings"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="edit"
                options={{
                    headerShown: false,
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="delete"
                options={{
                    headerShown: false,
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="password"
                options={{
                    headerShown: false,
                    presentation: 'modal',
                }}
            />
        </Stack>
    );
}

export default Settings;
