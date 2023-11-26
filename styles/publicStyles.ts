import {StyleSheet} from "react-native";

export const publicStyles = StyleSheet.create({
    keyboardContainer: {
        display: "flex",
        justifyContent: "center",
        height: "100%",
        width: "100%",
    },
    safeArea: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
    },
    headContainer: {
        display: "flex",
        gap: 8,
        width: "100%",
    },
    title: {
        color:"white",
        fontSize: 36,
        fontWeight: "500",
    },
    subtitle: {
        color:"white",
        fontSize: 20,
        fontWeight: "400",
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: 40,
        gap: 20,
    },
    divider: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
        width: "100%",
    },
    dividerLine: {
        flex: 3,
        backgroundColor: "#ffffff",
        height: 2,
    },
    dividerText: {
        flex: 1,
        textAlign: "center",
        color: "#ffffff",
    },
    signInButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 40,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginTop: 20,
        width: "100%",
    },
    signInText: {
        color: "black",
        fontWeight: "500",
        fontSize: 20,
    },
    scrollContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexGrow: 1,
        height: "100%",
    },
    backButton: {
        zIndex: 100,
        display: "flex",
        flexDirection: "row",
        alignSelf: "flex-start",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        fontSize: 26,
        color: "white",
        marginBottom: 30,
    },
    backText: {
        fontSize: 21,
        color: "white",
    },
    forgotPasswordLink:{
        color: "white",
        textDecorationLine:"underline",
    }
});
