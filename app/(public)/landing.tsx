import {View, SafeAreaView, Text, StyleSheet, Pressable, ImageBackground} from 'react-native'
import {useFonts, Montserrat_600SemiBold, Montserrat_700Bold} from '@expo-google-fonts/montserrat';
import {useRouter} from "expo-router";
const Landing = () => {
    const router = useRouter();
    let [fontsLoaded, fontError] = useFonts({
        Montserrat_600SemiBold,
        Montserrat_700Bold,
    });
    if (!fontsLoaded && !fontError) {
        return null;
    }

    const navigateTo=(path:string)=>{
        // @ts-ignore
        router.push(path);
    }

    return (
        <ImageBackground progressiveRenderingEnabled={true} source={require("@/assets/images/bg.jpg")}
                         resizeMode={"cover"} style={{flex: 1}}>
            <View style={styles.overlay}/>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.headContainer}>
                    <Text style={styles.title}>EXPLORE </Text>
                    <Text style={styles.title}>THE WORLD</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable onPress={()=>navigateTo("/login")}
                               style={styles.button}>
                        <Text style={[styles.buttonText, {color: "white"}]}>LOGIN</Text>
                    </Pressable>
                    <Pressable onPress={()=>navigateTo("/register")}
                        style={styles.buttonOutline}>
                        <Text style={styles.buttonText}>REGISTER</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    safeArea: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    headContainer: {
        display: "flex",
        width: "100%",
        marginBottom: 90,
    },
    title: {
        color: "white",
        fontSize: 50,
        fontFamily: "Montserrat_700Bold",
        fontWeight: "600"
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "400",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 20,

    },
    button: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        backgroundColor: "#000",
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 40,
    },
    buttonOutline: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 40,
    },
    buttonText: {
        color: "black",
        fontWeight: "500",
        fontFamily: "Montserrat_600SemiBold",
        fontSize: 20,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
})

export default Landing;
