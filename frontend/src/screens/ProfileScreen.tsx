import {StyleSheet, View} from "react-native";
import {UserInformation} from "../components/Profile/UserInformation";

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <UserInformation/>
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

export {ProfileScreen};
