import {StyleSheet, View} from "react-native";
import {Options} from "../components/Options/Options";

interface SettingsScreenProps {
    handleLogout: () => void;
}

export const OptionsScreen = ({handleLogout}:SettingsScreenProps) => {
    return (
        <View style={styles.container}>
            <Options handleLogout={handleLogout}/>
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
