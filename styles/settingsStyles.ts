import {StyleSheet} from "react-native";

export const settingsStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal:20,
    },
    titleContainer: {
        display: "flex",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 30,
    },
    title: {
        paddingTop: 20,
        color: "#000000",
        fontSize: 32,
    },
    section: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 30,
        paddingTop: 30,
    },
    actions: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
        width: "100%",
    },
    actionText: {
        paddingLeft: 20,
        alignSelf:"flex-start",
        fontSize: 18,
        color: "#000000",
    },
    options: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 25,
    },
})
