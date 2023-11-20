import {Stack} from 'expo-router';
import TabsPage from "@/app/(auth)/_layout";

const Settings = () => {
    return (
        <Stack>
            <Stack.Screen
                name="mainSettings"
                options={{
                    // Hide the header for all other routes.
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="modal"
                options={{
                    // Set the presentation mode to modal for our modal route.
                    presentation: 'modal',
                }}
            />
        </Stack>
    );
}

export default Settings;
