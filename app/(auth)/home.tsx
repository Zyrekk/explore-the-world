import { StyleSheet, View} from "react-native";
import React from "react";
import Map from "@/components/Map";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";

const Home = () => {
    return (
        <View
            style={styles.container}
        >
            <Map/>
            <ListingsBottomSheet/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default Home;
