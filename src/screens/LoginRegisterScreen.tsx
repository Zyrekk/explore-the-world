import {Welcome} from "../components/LoginRegister/Welcome"
import {ImageBackground, SafeAreaView, StyleSheet, View} from "react-native";


export const LoginRegisterScreen = () => {
    return (
        <ImageBackground source={require('../../assets/LoginRegisterBackground.jpg')} resizeMode={'cover'}
                         style={styles.image}>
            <View style={styles.overlay}/>
            <SafeAreaView style={styles.container}>
                <Welcome/>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: '100%',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
