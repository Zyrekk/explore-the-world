import {StyleSheet, View} from "react-native";
import {Settings} from "../components/Settings/Settings";

interface SettingsScreenProps {
    handleLogout: () => void;
}

export const SettingsScreen = ({handleLogout}:SettingsScreenProps) => {
    return (
        <View style={styles.container}>
            <Settings handleLogout={handleLogout}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: "100%",
        alignItems: "center"
    },
});
