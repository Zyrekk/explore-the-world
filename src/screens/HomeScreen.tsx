import {StartButton} from "../components/StartButton";
import {Map} from "../components/Map";
import {Navigation} from "../components/Navigation";
import {StyleSheet, View} from "react-native";



const HomeScreen =()=>{
    return(
        <View style={styles.container}>
            <StartButton/>
            <Map/>
            <Navigation/>
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

export {HomeScreen};
