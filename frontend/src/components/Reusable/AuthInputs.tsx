import { ReactNode } from "react";
import { TextInputIOSProps } from "react-native";
import { StyleSheet, TextInput, View } from "react-native";

export const renderInput = (
    icon: ReactNode,
    placeholder: string | undefined,
    value: string | undefined,
    onChangeText: ((text: string) => void) | undefined,
    textContentType?: TextInputIOSProps["textContentType"],
    secureTextEntry = false
) => (
    <View style={styles.inputContainer}>
        {icon}
        <TextInput
            style={[styles.input, styles.icon]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            autoCorrect={false}
            placeholderTextColor="#fff"
            underlineColorAndroid="transparent"
            textContentType={textContentType}
            secureTextEntry={secureTextEntry}
        />
    </View>
);

const styles = StyleSheet.create({
    inputContainer: {
        display: "flex",
        padding: 15,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 40,
        width: "70%",
        borderWidth: 2,
        borderColor: "white",
        marginTop: 25,
        height: 50,
        gap: 10,
        flexDirection: "row",
    },
    input: {
        flex: 1,
    },
    icon: {
        fontSize: 16,
        color: "white",
    },
});
